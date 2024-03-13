# dn_conditionalrenderer

This bundle makes it possible to create mutliple renderers and feature reductions for a layer to be used in different scale ranges, all by configuration.

## Usage

1. First you need to add the bundle dn_conditionalrenderer to your app.
2. Then you can configure it.

### Configuration Reference

```json
"dn_conditionalrenderer": {
    "Config": {
        "layerRendererScalesMapping2D": [
            {
                "layerId": "trees",
                "fallbackRenderer": {
                    "type": "simple",
                    "visualVariables": [
                        {
                            "type": "size",
                            "field": "stammdurchmesser",
                            "minDataValue": 30,
                            "maxDataValue": 80,
                            "minSize": 2,
                            "maxSize": 30
                        }
                    ],
                    "symbol": {
                        "type": "web-style",
                        "name": "park",
                        "styleName": "Esri2DPointSymbolsStyle"
                        
                    }
                },
                "scaleRenderers": [
                    {
                        "scaleFrom": 10000,
                        "scaleTo": 50000,
                        "renderer": {
                            "type": "heatmap",
                            "field": "hoehe",
                            "colorStops": [
                                {
                                    "color": "rgba(115, 0, 115, 0)",
                                    "ratio": 0
                                },
                                {
                                    "color": "#820082",
                                    "ratio": 0.083
                                },
                                {
                                    "color": "#910091",
                                    "ratio": 0.166
                                },
                                {
                                    "color": "#a000a0",
                                    "ratio": 0.249
                                },
                                {
                                    "color": "#af00af",
                                    "ratio": 0.332
                                },
                                {
                                    "color": "#c300c3",
                                    "ratio": 0.415
                                },
                                {
                                    "color": "#d700d7",
                                    "ratio": 0.498
                                },
                                {
                                    "color": "#eb00eb",
                                    "ratio": 0.581
                                },
                                {
                                    "color": "#ff00ff",
                                    "ratio": 0.664
                                },
                                {
                                    "color": "#ff58a0",
                                    "ratio": 0.747
                                },
                                {
                                    "color": "#ff896b",
                                    "ratio": 0.83
                                },
                                {
                                    "color": "#ffb935",
                                    "ratio": 0.913
                                },
                                {
                                    "color": "#ffea00",
                                    "ratio": 1
                                }
                            ],
                            "radius": 12,
                            "maxDensity": 0.04625,
                            "minDensity": 0
                        }
                    }
                ],
                "fallbackFeatureReduction": null,
                "scaleFeatureReductions": [
                    {
                        "scaleFrom": 50000,
                        "scaleTo": 10000000,
                        "featureReduction": {
                            "type": "cluster",
                            "fields": [
                            ],
                            "renderer": {
                                "type": "simple",
                                "symbol": {
                                    "type": "simple-marker",
                                    "style": "circle",
                                    "color": "#007f99",
                                    "size": 24,
                                    "outline": {
                                        "color": "#ebe6df",
                                        "width": 1
                                    }
                                },
                                "visualVariables": [
                                    {
                                        "type": "size",
                                        "field": "cluster_count",
                                        "stops": [
                                            {
                                                "value": 0,
                                                "size": 8
                                            },
                                            {
                                                "value": 15,
                                                "size": 12
                                            },
                                            {
                                                "value": 30,
                                                "size": 18
                                            },
                                            {
                                                "value": 45,
                                                "size": 48
                                            }
                                        ]
                                    }
                                ]
                            },
                            "clusterRadius": "120px",
                            "popupTemplate": {
                                "title": "Cluster summary",
                                "content": "This cluster represents {cluster_count} trees.",
                                "fieldInfos": [
                                    {
                                        "fieldName": "cluster_count",
                                        "format": {
                                            "places": 0,
                                            "digitSeparator": true
                                        }
                                    }
                                ]
                            },
                            "labelingInfo": [
                                {
                                    "deconflictionStrategy": "none",
                                    "labelExpressionInfo": {
                                        "expression": "Text($feature.cluster_count, '#,###')"
                                    },
                                    "symbol": {
                                        "type": "text",
                                        "color": "white",
                                        "font": {
                                            "family": "Noto Sans",
                                            "size": "12px"
                                        }
                                    },
                                    "labelPlacement": "center-center"
                                }
                            ]
                        }
                    }
                ]
            }
        ],
        "layerRendererScalesMapping3D": []
    }
}
```

The configuration of the bundle includes two main configuration item: `layerRendererScalesMapping2D` and `layerRendererScalesMapping3D`.<br>
These are lists of configurations respective to each layer needed to be configured for conditional rendering.<br>
`layerRendererScalesMapping2D` configures all 2D layers and `layerRendererScalesMapping3D` all 3D layers. Based on the viewmode of the view these will replace each other.<br>
Each item of the list of `layerRendererScalesMapping`s has the following configuration:

| Property                 | Type             | Possible Values | Default | Description           |
|--------------------------|------------------|-----------------|---------|-----------------------|
| layerId                  | String           |                 | ""      | Id of layer to applay renderers to |
| fallbackRenderer         | Object           |                 | {}      | Definition of renderer enabled if no more specific renderer applies. For details see [documentation](https://developers.arcgis.com/javascript/latest/api-reference/esri-renderers-Renderer.html) |
| scaleRenderers           | Array of Objects |                 | []      | Definitions of renderers to apply at certain scales. Look below on configuring the list members|
| fallbackFeatureReduction | Object           |                 | {}      | Definition of feature reduction enabled if no more specific feature reduction applies. For details see [documentation](https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-support-FeatureReductionCluster.html) |
| scaleFeatureReductions   | Array of Objects |                 | []      | Definitions of feature reductions to apply at certain scales. Look below on configuring the list members|

`scaleRenderes` and `scaleFeatureReductions` are both lists of scale dependent configuration.<br><br>
`scaleRenderes`: 
| Property                 | Type             | Possible Values | Default | Description           |
|--------------------------|------------------|-----------------|---------|-----------------------|
| scaleFrom                  | Number           |                 |       | Minimum scale |
| scaleTo         | Number           |                 |       | Maximum scale |
| renderer           | Object |                 |       | Definitions of renderers to apply at certain scales. For details see [documentation](https://developers.arcgis.com/javascript/latest/api-reference/esri-renderers-Renderer.html) |


`scaleFeatureReductions`: 
| Property                 | Type             | Possible Values | Default | Description           |
|--------------------------|------------------|-----------------|---------|-----------------------|
| scaleFrom                  | Number           |                 |       | Minimum scale |
| scaleTo         | Number           |                 |       | Maximum scale |
| featureReduction           | Object |                 |       | Definitions of feature reductions to apply at certain scales. For details see [documentation](https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-support-FeatureReductionCluster.html) |
