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

export default class ConditionalRendererConfigurator{
    #mappings = [];
    activate(): void{
        this.getView().then(() => {
            const view = this._mapWidgetModel.view;
            if(!view){
                return;
            }
            view.when(()=> {
                this.iterateLayerRendererScalesMappings();
                this.#mappings.forEach(mapping => {
                    this.changeLayerRendererForScale(mapping, view.scale);
                });
                view.watch("scale", (newScale) => {
                    this.#mappings.forEach(mapping => {
                        this.changeLayerRendererForScale(mapping, newScale);
                    });
                });
            });
        });
    }
    iterateLayerRendererScalesMappings(): void{
        const layerRendererScalesMapping = this._properties.layerRendererScalesMapping;
        layerRendererScalesMapping.forEach(mapping => {
            const layerId = mapping.layerId;
            const map = this._mapWidgetModel.map;
            const layer = map.allLayers.items.find( l => l.id === layerId);
            if(layer){
                this.#mappings.push({layer: layer, config: mapping});
            }
        });
    }
    changeLayerRendererForScale(mapping, scale): void{
        const scaleRenderers = mapping.config.scaleRenderers;
        const scaleFeatureReductions = mapping.config.scaleFeatureReductions;
        const matchedRenderer =
            scaleRenderers.find(r => scale > r.scaleFrom && scale < r.scaleTo);
        if(matchedRenderer){
            mapping.layer.renderer = matchedRenderer.renderer;
        }
        else{
            mapping.layer.renderer = mapping.config.fallbackRenderer;
        }
        const matchedFeatureReduction =
            scaleFeatureReductions.find(r => scale > r.scaleFrom && scale < r.scaleTo);
        if(matchedFeatureReduction){
            mapping.layer.featureReduction  = matchedFeatureReduction.featureReduction ;
        }
        else{
            mapping.layer.featureReduction = mapping.config.fallbackFeatureReduction;
        }
    }
    getView(): Promise{
        const mapWidgetModel = this._mapWidgetModel;
        return new Promise((resolve) => {
            if (mapWidgetModel.view) {
                resolve(mapWidgetModel.view);
            } else {
                mapWidgetModel.watch("view", ({value: view}) => {
                    resolve(view);
                });
            }
        });
    }
}
