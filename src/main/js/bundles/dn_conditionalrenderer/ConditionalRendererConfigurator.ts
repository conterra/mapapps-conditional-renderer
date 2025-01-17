///
/// Copyright (C) 2025 con terra GmbH (info@conterra.de)
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
import { CustomFeatureReduction, CustomRenderer, ExtendedView, Mapping, Config } from "./Interfaces";
import * as reactiveUtils from "esri/core/reactiveUtils";
import Layer from "esri/layers/Layer";

export default class ConditionalRendererConfigurator {

    private mappings: Array<Mapping> = [];

    private _mapWidgetModel: InjectedReference<MapWidgetModel>;
    private _properties: InjectedReference<Record<string, any>>;
    private _logService: InjectedReference<any>;
    private _i18n: InjectedReference<any>;
    private scaleWatcher: any;

    protected activate(): void {
        this.getView().then(view => {
            this.activationWorkflow(view);

            this._mapWidgetModel?.watch("view", () => {
                this.scaleWatcher.remove();
                this.getView().then(view => {
                    this.activationWorkflow(view);
                });
            });
        });
    }

    private activationWorkflow(view: ExtendedView): void{
        const i18n = this._i18n.get();
        if (this._mapWidgetModel?.viewmode === "2D"){
            const layerRendererScalesMapping2D = this._properties?.layerRendererScalesMapping2D ?
                this._properties?.layerRendererScalesMapping2D : this._properties?.layerRendererScalesMapping;
            this.iterateLayerRendererScalesMappings(layerRendererScalesMapping2D);
            this.createScaleWatcher(view);
        }
        else if (this._mapWidgetModel?.viewmode === "3D"){
            this.iterateLayerRendererScalesMappings(this._properties?.layerRendererScalesMapping3D);
            this.createScaleWatcher(view);
        }
        else{
            this._logService.warn(i18n.warnings.undefinedView);
        }
    }

    private iterateLayerRendererScalesMappings(viewmodeLayerRendererScalesMapping: Array<Config>): void {
        const i18n = this._i18n.get();
        if (Array.isArray(viewmodeLayerRendererScalesMapping)){
            viewmodeLayerRendererScalesMapping.forEach(mapping => {
                const layerId = mapping.layerId;
                const map = this._mapWidgetModel?.map;
                const scale = this._mapWidgetModel?.view?.scale;
                const layer = map?.allLayers.find((layer: Layer) => layer.id === layerId);
                if (layer) {
                    this.mappings.push({ layer: layer, config: mapping });
                    this.changeLayerRendererForScale({ layer: layer, config: mapping }, scale);
                }
                else {
                    const handle = reactiveUtils.watch(
                        () => map?.allLayers.find((layer: Layer) => layer.id === layerId),
                        (layer) => {
                            if(layer !== undefined) {
                                this.mappings.push({ layer: layer, config: mapping });
                                this.changeLayerRendererForScale({ layer: layer, config: mapping }, scale);
                                handle.remove();
                            }
                            else{
                                this._logService.info(i18n.warnings.rendererIncorrectDefined);
                            }
                        });
                }
            });
        }
        else{
            this._logService.info(i18n.warnings.noRendererDefined);
        }
    }

    private changeLayerRendererForScale(mapping: Mapping, scale: number): void {
        const scaleRenderers = mapping.config.scaleRenderers;
        const scaleFeatureReductions = mapping.config.scaleFeatureReductions;

        const matchedRenderer =
            scaleRenderers?.find((renderer: CustomRenderer) => scale > renderer.scaleFrom && scale < renderer.scaleTo);
        if (matchedRenderer) {
            mapping.layer.renderer = matchedRenderer.renderer;
        }
        else {
            mapping.layer.renderer = mapping.config.fallbackRenderer;
        }

        const matchedFeatureReduction =
            scaleFeatureReductions?.find((reduction: CustomFeatureReduction) =>
                scale > reduction.scaleFrom && scale < reduction.scaleTo);
        if (matchedFeatureReduction) {
            mapping.layer.featureReduction = matchedFeatureReduction.featureReduction;
        }
        else {
            mapping.layer.featureReduction = mapping.config.fallbackFeatureReduction;
        }
    }

    private createScaleWatcher(view: ExtendedView): void {
        this.scaleWatcher = view.watch("scale", (newScale) => {
            this.mappings.forEach((mapping: Mapping) => {
                this.changeLayerRendererForScale(mapping, newScale);
            });
        });
    }

    private getView(): Promise<ExtendedView> {
        const i18n = this._i18n.get();
        const mapWidgetModel = this._mapWidgetModel;

        return new Promise((resolve) => {
            if (mapWidgetModel?.view) {
                resolve(mapWidgetModel.view);
            } else {
                const watcher = mapWidgetModel?.watch("view", ({ value: view }) => {
                    watcher?.remove();
                    if(view !== undefined){
                        resolve(view);
                    }
                    else {
                        this._logService.warn(i18n.warnings.undefinedView);
                    }
                });
            }
        });
    }
}
