/*
 * Copyright (C) 2025 con terra GmbH (info@conterra.de)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
export default {
    bundleName: "Conditional Renderer",
    bundleDescription: "Dieses Bundle erlaubt es abhängig vom Maßstab verschiedene Renderer zu benutzen.",
    warnings: {
        undefinedView: "conditionalRenderer: Es konnte kein 'view' gefunden werden",
        noRendererDefined: "conditionalRenderer: Es wurden keine Renderer erstellt",
        rendererIncorrectDefined: "conditionalRenderer: Die Renderer wurden fehlerhaft definiert"
    }
};
