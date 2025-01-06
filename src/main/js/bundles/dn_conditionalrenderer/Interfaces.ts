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

export interface Mapping {
    config: Config,
    layer: ExtendedLayer
}

export interface Config {
    layerId: string,
    fallbackRenderer: __esri.Renderer,
    scaleRenderers: Array<CustomRenderer>,
    fallbackFeatureReduction: __esri.FeatureReductionCluster,
    scaleFeatureReductions: Array<CustomFeatureReduction>
}

export interface CustomRenderer {
    scaleFrom: number,
    scaleTo: number,
    renderer: __esri.Renderer
}

export interface CustomFeatureReduction {
    scaleFrom: number,
    scaleTo: number,
    featureReduction: __esri.FeatureReductionCluster
}

export interface ExtendedLayer extends __esri.Layer {
    renderer?: __esri.Renderer,
    featureReduction?: __esri.FeatureReductionCluster
}

export interface ExtendedView extends __esri.View {
    scale: number
}


