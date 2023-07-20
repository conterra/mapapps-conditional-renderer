///
/// Copyright (C) 2023 con terra GmbH (info@conterra.de)
///
/// Licensed under the Apache License, Version 2.0 (the "License");
/// you may not use this file except in compliance with the License.
/// You may obtain a copy of the License at
///
///         http://www.apache.org/licenses/LICENSE-2.0
///
/// Unless required by applicable law or agreed to in writing, software
/// distributed under the License is distributed on an "AS IS" BASIS,
/// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
/// See the License for the specific language governing permissions and
/// limitations under the License.
///

import { InjectedReference } from "apprt-core/InjectedReference";
import { MapWidgetModel } from "map-widget/api";
import { CustomFeatureReduction, CustomRenderer, ExtendedView, Mapping } from "./Interfaces";

export default class ConditionalRendererConfigurator {

    private mappings: Array<Mapping> = [];

    private _mapWidgetModel: InjectedReference<MapWidgetModel>;
    private _properties: InjectedReference<Record<string, any>>;

    protected activate(): void {
        this.getView().then(view => {
            this.iterateLayerRendererScalesMappings();
            this.mappings.forEach((mapping: Mapping) => {
                this.changeLayerRendererForScale(mapping, view.scale);
            });

            view.watch("scale", (newScale) => {
                this.mappings.forEach((mapping: Mapping) => {
                    this.changeLayerRendererForScale(mapping, newScale);
                });
            });
        });
    }

    private iterateLayerRendererScalesMappings(): void {
        const layerRendererScalesMapping = this._properties.layerRendererScalesMapping;

        layerRendererScalesMapping.forEach(mapping => {
            const layerId = mapping.layerId;
            const map = this._mapWidgetModel.map;
            const layer = map.allLayers.find((layer: __esri.Layer) => layer.id === layerId);
            if (layer) {
                this.mappings.push({ layer: layer, config: mapping });
            }
        });
    }

    private changeLayerRendererForScale(mapping: Mapping, scale: number): void {
        const scaleRenderers = mapping.config.scaleRenderers;
        const scaleFeatureReductions = mapping.config.scaleFeatureReductions;

        const matchedRenderer =
            scaleRenderers.find((renderer: CustomRenderer) => scale > renderer.scaleFrom && scale < renderer.scaleTo);
        if (matchedRenderer) {
            mapping.layer.renderer = matchedRenderer.renderer;
        }
        else {
            mapping.layer.renderer = mapping.config.fallbackRenderer;
        }

        const matchedFeatureReduction =
            scaleFeatureReductions.find((reduction: CustomFeatureReduction) =>
                scale > reduction.scaleFrom && scale < reduction.scaleTo);
        if (matchedFeatureReduction) {
            mapping.layer.featureReduction = matchedFeatureReduction.featureReduction;
        }
        else {
            mapping.layer.featureReduction = mapping.config.fallbackFeatureReduction;
        }
    }

    private getView(): Promise<ExtendedView> {
        const mapWidgetModel = this._mapWidgetModel;

        return new Promise((resolve) => {
            if (mapWidgetModel.view) {
                resolve(mapWidgetModel.view);
            } else {
                const watcher = mapWidgetModel.watch("view", ({ value: view }) => {
                    watcher.remove();
                    resolve(view);
                });
            }
        });
    }
}
