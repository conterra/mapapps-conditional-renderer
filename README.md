# Conditional Renderer
This bundle makes it possible to create mutliple renderers and feature reductions for a layer to be used in different scale ranges, all by configuration.

![Screenshot App](https://github.com/conterra/mapapps-conditional-renderer/blob/main/screenshot.JPG)

## Build Status
[![devnet-bundle-snapshot](https://github.com/conterra/mapapps-conditional-renderer/actions/workflows/devnet-bundle-snapshot.yml/badge.svg)](https://github.com/conterra/mapapps-conditional-renderer/actions/workflows/devnet-bundle-snapshot.yml)

## Sample App
https://demos.conterra.de/mapapps/resources/apps/downloads_conditionalrenderer/index.html

## Installation Guide
⚠️**Requirement: map.apps 4.13.0**

[dn_conditionalrenderer Documentation](https://github.com/conterra/mapapps-conditional-renderer/tree/main/src/main/js/bundles/dn_conditionalrenderer)

## Development Guide
### Define the mapapps remote base
Before you can run the project you have to define the mapapps.remote.base property in the pom.xml-file:
`<mapapps.remote.base>http://%YOURSERVER%/ct-mapapps-webapp-%VERSION%</mapapps.remote.base>`

### Other methods to to define the mapapps.remote.base property.
1. Goal parameters
`mvn install -Dmapapps.remote.base=http://%YOURSERVER%/ct-mapapps-webapp-%VERSION%`

2. Build properties
Change the mapapps.remote.base in the build.properties file and run:
`mvn install -Denv=dev -Dlocal.configfile=%ABSOLUTEPATHTOPROJECTROOT%/build.properties`
