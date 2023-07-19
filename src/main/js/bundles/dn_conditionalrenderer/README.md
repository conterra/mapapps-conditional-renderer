# dn_conditionalrenderer

This bundle makes it possible to create mutliple renderers and feature reductions for a layer to be used in different scale ranges, all by configuration.

## Usage

1. First you need to add the bundle dn_conditionalrenderer to your app.
2. Then you can configure it.

### Configuration Reference

```json
"dn_conditionalrenderer": {
    "Config": {
       "layerRendererScalesMapping": [
            {
                "layerId": "unternehmen",
                "fallbackRenderer": {
                    "type": "simple",
                    "visualVariables": [
                        {
                            "type": "size",
                            "field": "usto",
                            "minDataValue": 1,
                            "maxDataValue": 85,
                            "minSize": 2,
                            "maxSize": 30
                        }
                    ],
                    "symbol": {
                        "type": "simple-marker",
                        "color": [
                            127,
                            132,
                            61,
                            255
                        ],
                        "angle": 0,
                        "xoffset": 0,
                        "yoffset": 0,
                        "size": 4,
                        "style": "circle",
                        "outline": {
                            "type": "simple-line",
                            "color": [
                                0,
                                0,
                                0,
                                255
                            ],
                            "width": 0.7,
                            "style": "solid"
                        }
                    }
                },
                "scaleRenderers": [
                    {
                        "scaleFrom": 3000,
                        "scaleTo": 50000,
                        "renderer": {
                            "type": "heatmap",
                            "field": "usto",
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
                                {
                                    "name": "usto_total",
                                    "alias": "Total usto",
                                    "outStatistic": {
                                        "onStatisticField": "usto",
                                        "statisticType": "sum"
                                    }
                                }
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
                                        "field": "usto_total",
                                        "stops": [
                                            {
                                                "value": 0,
                                                "size": 8
                                            },
                                            {
                                                "value": 12,
                                                "size": 12
                                            },
                                            {
                                                "value": 500,
                                                "size": 18
                                            },
                                            {
                                                "value": 2500,
                                                "size": 48
                                            }
                                        ]
                                    }
                                ]
                            },
                            "clusterRadius": "120px",
                            "popupTemplate": {
                                "title": "Cluster summary",
                                "content": "This cluster represents {cluster_count} Unternehmen with {usto_total} ustos.",
                                "fieldInfos": [
                                    {
                                        "fieldName": "cluster_count",
                                        "format": {
                                            "places": 0,
                                            "digitSeparator": true
                                        }
                                    },
                                    {
                                        "fieldName": "usto_total",
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
            }]
        }
    }
}
```

| Property                 | Type             | Possible Values | Default | Description           |
|--------------------------|------------------|-----------------|---------|-----------------------|
| layerId                  | String           |                 | ""      | Id of layer to applay renderers to |
| fallbackRenderer         | Object           |                 | {}      | Definition of renderer enabled if no more specific renderer applies |
| scaleRenderers           | Array of Objects |                 | []      | Definitions of renderers to apply at certain scales. For details see [documentation](https://developers.arcgis.com/javascript/latest/api-reference/esri-renderers-Renderer.html) |
| fallbackFeatureReduction | Object           |                 | {}      | Definition of feature reduction enabled if no more specific feature reduction applies |
| scaleFeatureReductions   | Array of Objects |                 | []      | Definitions of feature reductions to apply at certain scales. For details see [documentation](https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-support-FeatureReductionCluster.html)|

