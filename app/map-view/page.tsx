"use client"
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import LandAreaModal from '@/components/prompt-boxes/land-area-modal';
import BespokeLandAreaModal from '@/components/prompt-boxes/bespoke-land-area-modal';
import UserLandBreakdownModal from '@/components/prompt-boxes/user-land-breakdown-modal';
import * as _ from "lodash";
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import { createClient } from '@/utils/supabase/client'
import * as maputils from '@/utils/maputils/maputils-main';
// import {ScissorsIcon} from '@heroicons/react/outline'
import { BeakerIcon } from '@heroicons/react/24/solid'
import * as turf from '@turf/turf';
import defaultDrawStyle from "../../lib/theme";
import mapCoordinates from 'geojson-apply-right-hand-rule'
// import SnapModeDrawStyles from "../../lib/customDrawStyles";
// import defaultDrawStyle from "@mapbox/mapbox-gl-draw/src/lib/theme.js";
// import defaultDrawStyle from "https://unpkg.com/@mapbox/mapbox-gl-draw@1.3.0/src/lib/theme.js";

import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
// import defaultDrawStyle from "@mapbox/mapbox-gl-draw/src/lib/theme.js";
// import SplitPolygonMode, {
//   drawStyles as splitPolygonDrawStyles,
// } from "mapbox-gl-draw-split-polygon-mode";

// import SplitPolygonMode, {
//   drawStyles as splitPolygonDrawStyles,
// } from "mapbox-split-polygon-mode";

import {
  SnapPolygonMode,
  SnapPointMode,
  SnapLineMode,
  SnapModeDrawStyles,
  SnapDirectSelect,
} from "mapbox-gl-draw-snap-mode";




const paragraphStyle = {
  fontFamily: 'Open Sans',
  margin: 0,
  fontSize: 13
};

const theme = MapboxDraw.lib.theme;

const modifiedDefaultStyles = theme.map(defaultStyle => {
  if (defaultStyle.id === 'gl-draw-line-inactive') {
    return {
      ...defaultStyle,
      filter: [
        ...defaultStyle.filter,
        ['!=', 'user_isSnapGuide', 'false'],
      ],
    };
  }

  return defaultStyle;
});

const customDrawStyles = [
  ...modifiedDefaultStyles,
  {
    id: "guide",
    type: "line",
    filter: [
      "all",
      ["==", "$type", "LineString"],
      ["==", "user_isSnapGuide", "true"],
    ],
    layout: {
      "line-cap": "round",
      "line-join": "round",
    },
    paint: {
      "line-color": "#c00c00",
      "line-width": 1,
      "line-dasharray": [5, 5],
    },
  },
];


class extendDrawBar {
  constructor(opt) {
    let ctrl = this;
    ctrl.draw = opt.draw;
    ctrl.buttons = opt.buttons || [];
    ctrl.onAddOrig = opt.draw.onAdd;
    ctrl.onRemoveOrig = opt.draw.onRemove;
  }
  onAdd(map) {
    let ctrl = this;
    ctrl.map = map;
    ctrl.elContainer = ctrl.onAddOrig(map);
    ctrl.buttons.forEach((b) => {
      ctrl.addButton(b);
    });
    return ctrl.elContainer;
  }
  onRemove(map) {
    ctrl.buttons.forEach((b) => {
      ctrl.removeButton(b);
    });
    ctrl.onRemoveOrig(map);
  }
  addButton(opt) {
    let ctrl = this;
    var elButton = document.createElement('button');
    elButton.className = 'mapbox-gl-draw_ctrl-draw-btn';
    if (opt.classes instanceof Array) {
      opt.classes.forEach((c) => {
        elButton.classList.add(c);
      });
    }
    if (opt.content) {
      if (opt.content instanceof Element) {
        elButton.appendChild(opt.content);
      } else {
        elButton.innerHTML = opt.content
      }
    }
    elButton.addEventListener(opt.on, opt.action);
    ctrl.elContainer.appendChild(elButton);
    opt.elButton = elButton;
  }
  removeButton(opt) {
    opt.elButton.removeEventListener(opt.on, opt.action);
    opt.elButton.remove();
  }
};

function randomString() {
  return (Math.random() * 1000000).toString(36).replace('.', '');
}

const getVisibilityValue = (idval) => {
  return idval == true ? 'visible' : 'none';
}
const supabase = createClient();


const  getUniqueLandClasses = (features) => {
  const landClassesSet = new Set();

  features.forEach(feature => {
      const landClass = feature.properties.class_name;
      if (landClass) {
          landClassesSet.add(landClass);
      }
  });

  return Array.from(landClassesSet);
}




const MapboxPage = () => {

  

  
  // console.log("Page is loading");
  const mapContainerRef = useRef();
  const mapRef = useRef();
  const clipb = useRef([]);
  const [roundedArea, setRoundedArea] = useState();
  const [mapLoaded, setMapLoaded] = useState(false);
  const [sourceLoaded, setSourceLoaded] = useState(false);
  const [proploaded, setProploaded] = useState(false);
  const [features, setFeatures] = useState();
  const selectedFeature = useRef(null);
  const selectedFeatureLayer = useRef('');
  const [activeLayer, setActiveLayer] = useState('layer-1');
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [showLandAreaModal, setShowLandAreaModal] = useState(false);
  const [showUserLandBreakdownModal, setShowUserLandBreakdownModal] = useState(false);
  const [showBespokeLandAreaModal, setShowBespokeLandAreaModal] = useState(false);
  const isSelectionMode = useRef(false);
  const mbdraw = useRef(null)
  const originalAreas = useRef({values: {}})
  const userSlopeClasses = useRef({values: {}})
  const saveLegalLayertodb = useRef()
  const landCoverAnalysisFormFields = useRef({landClasses: {}, totalArea: 0.0})
  const [sourceLayer, setSourceLayer] = useState(true);
  const [improvementsLayer, setImprovementsLayer] = useState(true);
  const [landBreakdownLayer, setLandBreakdownLayer] = useState(true);
  const [bespokeSlopeLayer, setBespokeLayer] = useState(true);
  const [bespokeLandCoverLayer, setBespokeLandCoverLayer] = useState(true);
  const [legalLayer, setLegalLayer] = useState(true);
  const [propertyLayer, setPropertyLayer] = useState(true);
  const [landcoverLayer, setLandcoverLayer] = useState(true);
  const [slopeLayer, setSlopeLayer] = useState(true);
  // const slopeGeom = useRef({ wkb_geometry: any; }[]: []);
  const [intersectionLayer, setIntersectionLayer] = useState(true);
  

  // useEffect(() => {
  //   if(mapRef?.current?.areTilesLoaded()){
  //     mapRef?.current?.addLayer({
  //       id: 'clipboard',
  //       type: 'fill'
  //     })
  //     console.log("Testing this")

  //   }
  // });

  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1Ijoia2FzaGlmbWhkIiwiYSI6ImNsejFoMmpubzJraWUyd3NnMnh2dmV4a2cifQ.Bs7HSSLKyMN0HgpFrTD1Yw';
    // if (!mapRef.current){
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/satellite-v9',
        // center: [-91.874, 42.76],
        center: [175.31, -37.39],
        zoom: 8
      });


    // const fetchSlopeGeometry = async () => {
    //   const { data, error } = await supabase.from('bespokeslopesample').select('wkb_geometry')
    //   if(data){
    //     // console.log("Geometry: ", data)
    //     // slopeGeom.current = data;
    //     return data;
    //   }
    //   else if(error) {
    //     return error;
    //   }
    // }
    // const fetchLandcoverGeometry = async () => {
    //   const { data, error } = await supabase.from('bespokelandcoversample').select('wkb_geometry')
    //   if(data){
    //     // console.log("Geometry: ", data)
    //     // slopeGeom.current = data;
    //     return data;
    //   }
    //   else if(error) {
    //     return error;
    //   }
    // }
    // const fetchSlopeClasses = async () => {
    //   console.log("Connection details: ", JSON.stringify(supabase))
    //   console.log("Connection2 details: ", JSON.stringify(supabase))
    //   const { data, error } = await supabase.from('list_pastoral_land_classes').select()
    //   if(data){
    //     // console.log("Geometry: ", data)
    //     // slopeGeom.current = data;
    //     return data;
    //   }
    //   else if(error) {
    //     return error;
    //   }
    // }

    

    saveLegalLayertodb.current = (data) => {
      // const 
      console.log("Its here: ", data)
    }

    // fetchGeometry();

    

    const draw = new MapboxDraw({
      displayControlsDefault: true,
      // controls: {
      //   polygon: true,
      //   trash: true,
      //   pan: true
      // },
      // modes: {
      //   ...SplitPolygonMode(MapboxDraw.modes),
      // },
      // styles: [...splitPolygonDrawStyles(defaultDrawStyle),],
      modes: {
        ...MapboxDraw.modes,
        // ...SplitPolygonMode(MapboxDraw.modes),
        // Object.assign( {
        draw_point: SnapPointMode,
        draw_polygon: SnapPolygonMode,
        draw_line_string: SnapLineMode,
        direct_select: SnapDirectSelect,
        
      // }, MapboxDraw.modes)
      },
      userProperties: true,
      // // Styling guides
      // styles: [SnapModeDrawStyles],
      snap: true,
      snapOptions: {
        snapPx: 15, // defaults to 15
        snapToMidPoints: true, // defaults to false
        snapVertexPriorityDistance: 2.0025, // defaults to 1.25
      },
      guides: false,
      defaultMode: 'draw_polygon'
      
    });
    mbdraw.current = draw
    mapRef.current.on('load', () => {
      // console.log("Layers: ", JSON.stringify(mapRef.current.getStyle().layers))
      // return true;
      // const firstSourceId = mapRef.current.getStyle().sources.find(l => (l.type === "Arotahi" && l.source === "test-source"))?.id;
      // const firstSymbolId = mapRef.current.getStyle().layers.find(l => (l.type === "Arotahi" && l.source === "test-source"))?.id;
      // mapRef.current.addLayer({
      //   id: "regional-districts-suburbs-localities",
      //   type: "raster",
      //   source: {
      //     type: "raster",
      //     tiles: [
      //         // This is the XYZ template URL from the Koordinates layer
      //         // services page: https://labs.koordinates.com/layer/7328-new-zealand-earthquakes/webservices/
      //         // "https://koordinates-tiles-a.global.ssl.fastly.net/services;key=03812364cdf64caf996bbbcefb77cdb6/tiles/v4/layer=119532/EPSG:3857/{z}/{x}/{y}.png"
      //         // "https://koordinates-tiles-a.global.ssl.fastly.net/services;key=03812364cdf64caf996bbbcefb77cdb6/tiles/v4/layer=119509/EPSG:3857/{z}/{x}/{y}.png"
      //         "https://data.linz.govt.nz/services;key=03812364cdf64caf996bbbcefb77cdb6/wfs/?service=WFS&request=GetCapabilities"
      //         ],
      //         tileSize: 256,
      //         maxzoom: 22,
      //         attribution: "Regions Districts Suburbs Localities"
      //         // attribution: "<a href='https://labs.koordinates.com/layer/7328-new-zealand-earthquakes/'>New Zealand Earthquakes</a>"
      //   },
      //   paint: {
      //     "fill-color": "#00ffff"
      //   }
      // },
      // firstSymbolId // Insert the layer beneath the first symbol layer.
      // );
      // if(!sourceLoaded){
      //   const newid = randomString()
      //   mapRef.current.addSource(newid, {
      //     type: 'geojson',
      //     // data: 'https://arotahiagri.koordinates.com/services;key=03812364cdf64caf996bbbcefb77cdb6/wfs/layer-119551/?service=WFS&REQUEST=GetFeature&TYPENAME=arotahiagri.koordinates.com:layer-119551&outputformat=application/json'
      //     data: 'https://arotahiagri.koordinates.com/services;key=03812364cdf64caf996bbbcefb77cdb6/wfs/layer-119551/?service=WFS&REQUEST=GetFeature&TYPENAME=arotahiagri.koordinates.com:layer-119551&outputformat=application/json'
      //   });
      
      //   mapRef.current.addLayer({
      //     id: "test-property-layer",
      //     type: "Arotahi",
      //     source: newid,
      //     slot: "top",
      //     paint: {
      //       "fill-color": "#ffffff"
      //     }
      //   },
      //   );
      //   setSourceLoaded(true);
      // }
      // if(proploaded != true){
      //   mapRef.current.addSource('nz-p', {
      //     type: 'geojson',
      //     // data: 'https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson'
      //     data: 'https://arotahiagri.koordinates.com/services/query/v1/vector.json?key=03812364cdf64caf996bbbcefb77cdb6&layer=119532&x=[x]&y=[y]&max_results=3&radius=10000&geometry=true&with_field_names=true'
      //   });
      //   setProploaded(true)
      // }
      // mapRef.current.addLayer({
      //   id: "nz-bespoke-landcover-tiles",
      //   type: "raster",
      //   source: {
      //     type: "raster",
      //     tiles: [
      //         // This is the XYZ template URL from the Koordinates layer
      //         // services page: https://labs.koordinates.com/layer/7328-new-zealand-earthquakes/webservices/
      //         "https://koordinates-tiles-a.global.ssl.fastly.net/services;key=03812364cdf64caf996bbbcefb77cdb6/tiles/v4/layer=119512/EPSG:3857/{z}/{x}/{y}.png"
      //         // "https://koordinates-tiles-a.global.ssl.fastly.net/services;key=03812364cdf64caf996bbbcefb77cdb6/tiles/v4/layer=119509/EPSG:3857/{z}/{x}/{y}.png"
      //         ],
      //         tileSize: 256,
      //         maxzoom: 22,
      //         attribution: "Bespoke Land Cover"
      //         // attribution: "<a href='https://labs.koordinates.com/layer/7328-new-zealand-earthquakes/'>New Zealand Earthquakes</a>"
      //   },
      //   paint: {
      //     "fill-color": "#00ffff"
      //   }
      // },
      // firstSymbolId // Insert the layer beneath the first symbol layer.
      // );
      maputils.fetchSlopeClasses().then((data) => {
        console.log("Classes Fetch: ", data)
      })
      try{

        
        maputils.fetchLandcoverGeometry().then((data) => {
          // console.log("Geometry is fetched: ", data)
          data = data.data
          if(data.length > 0){
            let geojsondata = {
              "type": "FeatureCollection",
              "features": [],
              "totalFeatures": data?.length,
              "numberReturned": data?.length,
              "crs": {
                "type": "name",
                "properties": {
                  "name": "urn:ogc:def:crs:EPSG::4326"
                }
              }
            }
            data.forEach((element, i) => {
              console.log("d: ", element)
              let el = {
                type: "Feature", 
                id: "geom-"+i.toString(),
                geometry: element.wkb_geometry
              }
              geojsondata["features"].push(el)
            });
            console.log("Geojsondata: ", geojsondata)
            try{
              if (mapRef.current.getSource("db-landcover")) {
                mapRef.current.getSource("db-landcover").setData(geojsondata);
              }else{
                mapRef.current.addSource('db-landcover', {
                    type: 'geojson',
                    data: geojsondata
                });
        
                // Add Layer 1
                mapRef.current.addLayer({
                    id: 'db-landcover',
                    type: 'fill',
                    source: 'db-landcover',
                    paint: {
                        'fill-color': '#ff0000',
                        'fill-opacity': 0.3
                    }
                });
              }
              console.log("Source: ", mapRef.current.getSource('db-landcover'))

            }catch(ex){
              console.log(ex)
            }

          }
        })
        // fetchLandCoverAnalysis().then((data) => {
        //   console.log("Data from call: ", data)

        //   let geojsondata = {
        //     "type": "FeatureCollection",
        //     "features": data.map(feature => ({
        //       type: "Feature",
        //       geometry: feature.geom,  // Assuming 'geom' is already in GeoJSON format
        //       properties: {
        //           class_name: feature.class_name,
        //           slope_area: feature.slope_area
        //       }
        //     })),
        //     "totalFeatures": data?.length,
        //     "numberReturned": data?.length,
            
        //   }

        //   if (mapRef.current.getSource('land-cover-analysis')) {
        //     mapRef.current.getSource('land-cover-analysis').setData(geojsondata);
        //   }
          
        // })
        maputils.fetchSlopeGeometry().then((data) => {
          // console.log("Geometry is fetched: ", data)
          data = data.data
          if(data.length > 0){
            let geojsondata = {
              "type": "FeatureCollection",
              "features": [],
              "totalFeatures": data?.length,
              "numberReturned": data?.length,
              "crs": {
                "type": "name",
                "properties": {
                  "name": "urn:ogc:def:crs:EPSG::4326"
                }
              }
            }
            data.forEach((element, i) => {
              console.log("d: ", element)
              let el = {
                type: "Feature", 
                id: "geom-"+i.toString(),
                geometry: element.wkb_geometry
              }
              geojsondata["features"].push(el)
            });
            console.log("Geojsondata: ", geojsondata)
            try{
              if (mapRef.current.getSource("db-slope")) {
                mapRef.current.getSource("db-slope").setData(geojsondata);
              }else{
                mapRef.current.addSource('db-slope', {
                    type: 'geojson',
                    data: geojsondata
                });
        
                // Add Layer 1
                mapRef.current.addLayer({
                    id: 'db-slope',
                    type: 'fill',
                    source: 'db-slope',
                    paint: {
                        'fill-color': '#00ff00',
                        'fill-opacity': 0.3
                    }
                });
              }
              console.log("Source: ", mapRef.current.getSource('db-slope'))

            }catch(ex){
              console.log(ex)
            }

          }
        })

        // console.log("Data: ", data);
        // console.log("Error: ", error);

      

        mapRef.current.addSource('source-layer-1', {
            type: 'geojson',
            data: {
                type: 'FeatureCollection',
                features: []
            }
        });

        // Add Layer 1
        mapRef.current.addLayer({
            id: 'layer-1',
            type: 'fill',
            source: 'source-layer-1',
            paint: {
                'fill-color': '#888888',
                'fill-opacity': 0.5
            }
        });
        mapRef.current.addSource('db-improvements', {
            type: 'geojson',
            data: {
                type: 'FeatureCollection',
                features: []
            }
        });

        // Add Layer 1
        mapRef.current.addLayer({
            id: 'db-improvements',
            type: 'fill',
            source: 'db-improvements',
            paint: {
                'fill-color': '#888888',
                'fill-opacity': 0.5
            }
        });

        // Add Source Layer 2
        mapRef.current.addSource('legal-boundary', {
            type: 'geojson',
            data: {
                type: 'FeatureCollection',
                features: []
            }
        });

        // Add Layer 2 with the new name "User Legal Boundary"
        mapRef.current.addLayer({
            id: 'legal-boundary',
            type: 'fill',
            source: 'legal-boundary',
            paint: {
                'fill-color': '#FF0000',
                'fill-opacity': 0.5
            }
        });

        // Add Source for NZ Property Titles (from Koordinates)
        mapRef.current.addSource('nz-property', {
            type: 'geojson',
            data: 'https://arotahiagri.koordinates.com/services;key=03812364cdf64caf996bbbcefb77cdb6/wfs/layer-119551/?service=WFS&REQUEST=GetFeature&TYPENAME=arotahiagri.koordinates.com:layer-119551&outputformat=application/json'
        });

        // Add NZ Property Titles Layer
        mapRef.current.addLayer({
            id: 'nz-property',
            type: 'fill',
            source: 'nz-property',
            paint: {
                'fill-color': '#FFFF00',
                'fill-opacity': 0.5
            }
        });
        mapRef.current.addSource('land-cover-analysis', {
            type: 'geojson',
            data: []
        });

        // Add NZ Property Titles Layer
        mapRef.current.addLayer({
            id: 'land-cover-analysis',
            type: 'fill',
            source: 'land-cover-analysis',
            paint: {
              'fill-color': [
                  'match',
                  ['get', 'class_name'],
                  // Slope layer colors
                  'Flat (0-3°)', '#FFFAF5',  // Lightest shade
                  'Und. (4-7°)', '#FFE8DC',  // Lighter shade
                  'Rolling (8-15°)', '#FFD1B9',  // Light shade
                  'Str. Rolling (16-20°)', '#FFA488',  // Medium shade
                  'Mod. Steep (21-25°)', '#FF5C5C',  // Dark shade
                  'Steep (26-35°)', '#D32F2F',  // Darker shade
                  'V. Steep (>35°)', '#B71C1C',  // Darkest shade
                  // Land Cover layer colors
                  'Pasture', '#a8e6a3',  // Light green
                  'Bare Land', '#6cd155',  // Green
                  'Buildings/Yards', '#ece452',  // Yellow
                  'Native Forest', '#da70d6',  // Pink
                  'Exotic Forest', '#ff5c5c',  // Red
                  '#888888' // Default color (grey)
              ],
              'fill-opacity': 0.5
          }
        });

        // Add Highlight Layer for Selection
        mapRef.current.addSource('highlighted-feature', {
            type: 'geojson',
            data: {
                type: 'FeatureCollection',
                features: []
            }
        });

        mapRef.current.addLayer({
            id: 'highlighted-feature',
            type: 'line',
            source: 'highlighted-feature',
            paint: {
                'line-color': '#00FFFF',
                'line-width': 4
            }
        });

        mapRef.current.addSource('intersection-layer', {
            type: 'geojson',
            data: {
                type: 'FeatureCollection',
                features: []
            }
        });

        mapRef.current.addLayer({
            id: 'intersection-layer',
            type: 'line',
            source: 'intersection-layer',
            paint: {
                'line-color': '#FF00FF',
                'line-width': 1
            }
        });



        mapRef.current.on('click', (e) => {
          console.log("clicked on map: ", {isSelectMode}, ", ", {isSelectionMode})
          if (isSelectionMode.current) {
            console.log("Select mode is active: ", isSelectionMode)
            const bbox = [
                [e.point.x - 10, e.point.y - 10],
                [e.point.x + 10, e.point.y + 10]
            ];

            const featuresLayer1 = mapRef.current.queryRenderedFeatures(bbox, {
                layers: ['layer-1']
            });
            const featuresLayer2 = mapRef.current.queryRenderedFeatures(bbox, {
                layers: ['legal-boundary']
            });
            const featuresLayer3 = mapRef.current.queryRenderedFeatures(bbox, {
                layers: ['nz-property']
            });
            const featuresIntersectionLayer = mapRef.current.queryRenderedFeatures(bbox, {
                layers: ['intersection-layer']
            });
            const featuresLandcoverLayer = mapRef.current.queryRenderedFeatures(bbox, {
                layers: ['db-landcover']
            });
            const featuresSlopeLayer = mapRef.current.queryRenderedFeatures(bbox, {
                layers: ['db-slope']
            });

            console.log("Features Layer 1: ", featuresLayer1)
            console.log("Features Layer 2: ", featuresLayer2)
            console.log("Features Layer 3: ", featuresLayer3)
            console.log("Features Intersection Layer: ", featuresIntersectionLayer)
            console.log("Features Landcover Layer: ", featuresLandcoverLayer)
            console.log("Features Slope Layer: ", featuresSlopeLayer)

            if (featuresLayer1.length) {
              // setSelectedFeature(featuresLayer1[0])
              // setSelectedFeatureLayer('layer-1')
              selectedFeature.current = featuresLayer1[0];
              selectedFeatureLayer.current = 'layer-1'
              console.log('Selected feature from Layer 1:', selectedFeature.current);
                
            } else if (featuresLayer2.length) {
              selectedFeature.current = featuresLayer2[0];
              selectedFeatureLayer.current = 'legal-boundary'
              console.log('Selected feature from Layer 2:', selectedFeature.current);
            } else if (featuresIntersectionLayer.length) {
              selectedFeature.current = featuresIntersectionLayer[0];
              selectedFeatureLayer.current = 'intersection-layer'
              console.log('Selected feature from Intersection Layer:', selectedFeature.current);
              
            } else if (featuresLandcoverLayer.length) {
              selectedFeature.current = featuresLandcoverLayer[0];
              selectedFeatureLayer.current = 'db-landcover'
              console.log('Selected feature from Landcover Layer:', selectedFeature.current);
              
            } else if (featuresSlopeLayer.length) {
              selectedFeature.current = featuresSlopeLayer[0];
              selectedFeatureLayer.current = 'db-slope'
              console.log('Selected feature from Slope Layer:', selectedFeature.current);
              
            } else if (featuresLayer3.length) {
              selectedFeature.current = featuresLayer3[0];
              selectedFeatureLayer.current = 'nz-property'
              console.log('Selected feature from Layer 3:', selectedFeature.current);
              
            } else {
                console.log('No feature found at this location. Try again.');
            }
          highlightFeature(selectedFeature.current);
          isSelectionMode.current = false;
          // setIsSelectMode(false); // Disable select mode after selection
        }
      });



        // setInterval(() => {console.log("Layers: ", JSON.stringify(mapRef.current.getStyle().layers));}, 3000)
      }catch(ex){
        // console.error(ex)
      }
    });

    const highlightFeature = (feature: any) => {
      const highlightSource = mapRef.current.getSource('highlighted-feature');
      highlightSource.setData({
          type: 'FeatureCollection',
          features: [feature]
      });
    }
    const copyMultilayerFeature = () => {
      if (selectedFeature.current != null) {
        console.log('Feature copied:', selectedFeature.current);
      } else {
        console.log('No feature selected to copy.');
      }
    }

    const pasteMultilayerFeature = () => {
      if (selectedFeature.current != null) {
        const targetLayer = activeLayer;

        if (selectedFeatureLayer.current !== targetLayer) {
          pasteFeatureIntoLayer(selectedFeature.current, targetLayer);
        } else {
          console.log('Cannot paste into the same layer from which the feature was copied.');
        }
      } else {
        console.log('No feature to paste.');
      }
    }
    const pasteFeatureIntoLayer = (feature, targetLayerId) =>{
      const targetSource = mapRef.current.getSource(targetLayerId);
      const targetData = targetSource._data;

      // Remove the existing IDs to prevent conflicts
      const newFeature = JSON.parse(JSON.stringify(feature));
      delete newFeature.id;
      delete newFeature.properties.id;

      // Add the feature to the target layer's data
      targetData.features.push(newFeature);

      targetSource.setData(targetData);

      console.log(`Feature pasted into layer ${targetLayerId}`);
    }

    const deselectFeature = () => {
      selectedFeature.current = null;
      selectedFeatureLayer.current = '';
      const highlightSource = mapRef.current.getSource('highlighted-feature');
      highlightSource.setData({
          type: 'FeatureCollection',
          features: []
      });
    }

    const deleteFeature = () => {
      if (selectedFeature.current && selectedFeatureLayer.current) {
        deleteFeatureFromLayer(selectedFeature, selectedFeatureLayer);
        deselectFeature(); // Deselect after deletion
      } else {
        console.log('No feature selected to delete.');
      }
    }

    const deleteFeatureFromLayer = (feature, layerId) => {
      const source = mapRef.current.getSource(layerId);
      const data = source._data;

      // Filter out the feature to delete
      data.features = data.features.filter(f => f.id !== feature.id);

      // Update the source data
      source.setData(data);

      console.log(`Feature deleted from layer ${layerId}`);
    }
    
    const drawBar = new extendDrawBar({
      draw: draw,
      buttons: [
      //   {
      //   on: 'click',
      //   action: (() => {draw.changeMode("split_polygon")}),
      //   classes: ['text-black', 'border-black', 'text-opacity-50'],
      //   // content: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="#fff">
      //   // <path fill-rule="evenodd" d="M5.5 2a3.5 3.5 0 101.665 6.58L8.585 10l-1.42 1.42a3.5 3.5 0 101.414 1.414l8.128-8.127a1 1 0 00-1.414-1.414L10 8.586l-1.42-1.42A3.5 3.5 0 005.5 2zM4 5.5a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm0 9a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" clip-rule="evenodd" />
      //   // <path d="M12.828 11.414a1 1 0 00-1.414 1.414l3.879 3.88a1 1 0 001.414-1.415l-3.879-3.879z" />
      //   // content: <BeakerIcon className="h-5 w-5 text-blue-500"/>
      //   content: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black">
      //   <path fill-rule="evenodd" d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 002 4v10a1 1 0 00.293.707L6 18.414V5.586L3.707 3.293zM17.707 5.293L14 1.586v12.828l2.293 2.293A1 1 0 0018 16V6a1 1 0 00-.293-.707z" clip-rule="evenodd" />
      // </svg>`
      // // </svg>`
      // }, 
      {
        on: 'click',
        action: (() => {draw.changeMode("draw_polygon")}),
        classes: ['text-black', 'border-black', 'text-opacity-50'],
        // content: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="#fff">
        // <path fill-rule="evenodd" d="M5.5 2a3.5 3.5 0 101.665 6.58L8.585 10l-1.42 1.42a3.5 3.5 0 101.414 1.414l8.128-8.127a1 1 0 00-1.414-1.414L10 8.586l-1.42-1.42A3.5 3.5 0 005.5 2zM4 5.5a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm0 9a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" clip-rule="evenodd" />
        // <path d="M12.828 11.414a1 1 0 00-1.414 1.414l3.879 3.88a1 1 0 001.414-1.415l-3.879-3.879z" />
        // content: <BeakerIcon className="h-5 w-5 text-blue-500"/>
        content: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.25 2H13C7.47715 2 3 6.47715 3 12C3 17.5228 7.47715 22 13 22H16.25V17H13C10.2386 17 8 14.7614 8 12C8 9.23858 10.2386 7 13 7H16.25V2Z" fill="#1C274C"/>
        <path d="M17.75 7H19.5C20.3284 7 21 6.32843 21 5.5V3.5C21 2.67157 20.3284 2 19.5 2H17.75V7Z" fill="#1C274C"/>
        <path d="M17.75 17V22H19.5C20.3284 22 21 21.3284 21 20.5V18.5C21 17.6716 20.3284 17 19.5 17H17.75Z" fill="#1C274C"/>
        </svg>`
      // </svg>`
      }, {
        on: 'click',
        action: getDifference,
        classes: ['text-black', 'border-black', 'text-opacity-50'],
        // content: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="#fff">
        // <path fill-rule="evenodd" d="M5.5 2a3.5 3.5 0 101.665 6.58L8.585 10l-1.42 1.42a3.5 3.5 0 101.414 1.414l8.128-8.127a1 1 0 00-1.414-1.414L10 8.586l-1.42-1.42A3.5 3.5 0 005.5 2zM4 5.5a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm0 9a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" clip-rule="evenodd" />
        // <path d="M12.828 11.414a1 1 0 00-1.414 1.414l3.879 3.88a1 1 0 001.414-1.415l-3.879-3.879z" />
        // content: <BeakerIcon className="h-5 w-5 text-blue-500"/>
        content: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.25 2H13C7.47715 2 3 6.47715 3 12C3 17.5228 7.47715 22 13 22H16.25V17H13C10.2386 17 8 14.7614 8 12C8 9.23858 10.2386 7 13 7H16.25V2Z" fill="#1C274C"/>
        <path d="M17.75 7H19.5C20.3284 7 21 6.32843 21 5.5V3.5C21 2.67157 20.3284 2 19.5 2H17.75V7Z" fill="#1C274C"/>
        <path d="M17.75 17V22H19.5C20.3284 22 21 21.3284 21 20.5V18.5C21 17.6716 20.3284 17 19.5 17H17.75Z" fill="#1C274C"/>
        </svg>`
      // </svg>`
      }, {
        on: 'click',
        action: getIntersects,
        classes: ['text-black', 'border-black', 'text-opacity-50'],
        // content: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="#fff">
        // <path fill-rule="evenodd" d="M5.5 2a3.5 3.5 0 101.665 6.58L8.585 10l-1.42 1.42a3.5 3.5 0 101.414 1.414l8.128-8.127a1 1 0 00-1.414-1.414L10 8.586l-1.42-1.42A3.5 3.5 0 005.5 2zM4 5.5a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm0 9a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" clip-rule="evenodd" />
        // <path d="M12.828 11.414a1 1 0 00-1.414 1.414l3.879 3.88a1 1 0 001.414-1.415l-3.879-3.879z" />
        // content: <BeakerIcon className="h-5 w-5 text-blue-500"/>
        content: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.25 2H13C7.47715 2 3 6.47715 3 12C3 17.5228 7.47715 22 13 22H16.25V17H13C10.2386 17 8 14.7614 8 12C8 9.23858 10.2386 7 13 7H16.25V2Z" fill="#1C274C"/>
        <path d="M17.75 7H19.5C20.3284 7 21 6.32843 21 5.5V3.5C21 2.67157 20.3284 2 19.5 2H17.75V7Z" fill="#1C274C"/>
        <path d="M17.75 17V22H19.5C20.3284 22 21 21.3284 21 20.5V18.5C21 17.6716 20.3284 17 19.5 17H17.75Z" fill="#1C274C"/>
        </svg>`
      // </svg>`
      }, {
        on: 'click',
        action: getClip,
        classes: ['text-black', 'border-black', 'text-opacity-50'],
        content: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black">
        <path fill-rule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clip-rule="evenodd" />
      </svg>`
      }, {
        on: 'click',
        action: cutFeature,
        classes: ['text-black', 'border-black', 'text-opacity-50'],
        content: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black">
        <path fill-rule="evenodd" d="M5.5 2a3.5 3.5 0 101.665 6.58L8.585 10l-1.42 1.42a3.5 3.5 0 101.414 1.414l8.128-8.127a1 1 0 00-1.414-1.414L10 8.586l-1.42-1.42A3.5 3.5 0 005.5 2zM4 5.5a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm0 9a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" clip-rule="evenodd" />
        <path d="M12.828 11.414a1 1 0 00-1.414 1.414l3.879 3.88a1 1 0 001.414-1.415l-3.879-3.879z" />
      </svg>`
        
      }, {
        on: 'click',
        action: copyFeature,
        classes: ['text-black', 'border-black', 'text-opacity-50'],
        content: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black">
        <path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z" />
        <path d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L10.414 13H15v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5zM15 11h2a1 1 0 110 2h-2v-2z" />
        </svg>`
        
      }, {
        on: 'click',
        action: pasteFeature,
        classes: ['text-black', 'border-black', 'text-opacity-50'],
        content: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black">
        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
        <path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd" />
      </svg>`
        
      }]
    });
    mapRef.current.addControl(drawBar, "top-left");
    
    // mapRef.current.addControl(drawBar);
    // draw.changeMode("split_polygon");

    mapRef.current.on('draw.create', updateArea);
    mapRef.current.on('draw.delete', updateArea);
    mapRef.current.on('draw.update', updateArea);

    // draw.changeMode(
    //   "split_polygon",
    //   /** Default option values: */
    //   {
    //     highlightColor: "#222",
    //     lineWidth: 0,
    //     lineWidthUnit: "kilometers",
    //   }
    // );
    function cutFeature(e){
      const selected = _.cloneDeep(draw.getSelected());
      const selectedids = draw.getSelectedIds();


      console.log("Clipboard: ", clipb)
      let clipcontent = [];
      console.log("Selected: ", JSON.stringify(selected))
      console.log("Clip content: ", [])
      console.log("Clipboard: ", clipb)
      console.log("Feature count: ", selected?.features.length)
      selected?.features.every((feature, index) => {
        // clipcontent.push({type: "Feature", geometry: _.cloneDeep(feature.geometry)});
        delete feature.id;
        return true;
      })
      clipb.current = selected;
      draw.delete(selectedids)
      // setClipb(["This is some content"])

      // draw.delete(selected.features.map((f) => {return f.id;}))
      // console.log("Selected: ", JSON.stringify(selected))
      

    }
    function copyFeature(e){
      const selected = _.cloneDeep(draw.getSelected());
      

      console.log("Clipboard: ", clipb)
      let clipcontent = [];
      console.log("Selected: ", JSON.stringify(selected))
      console.log("Clip content: ", [])
      console.log("Clipboard: ", clipb)
      console.log("Feature count: ", selected?.features.length)
      selected?.features.every((feature, index) => {
        // clipcontent.push({type: "Feature", geometry: _.cloneDeep(feature.geometry)});
        delete feature.id;
        return true;
      })
      clipb.current = selected;
      // setClipb(["This is some content"])

      // draw.delete(selected.features.map((f) => {return f.id;}))
      // console.log("Selected: ", JSON.stringify(selected))
      

    }
    function pasteFeature(e){
      console.log("Clipboard Contents: ", clipb)
      if(clipb?.current && clipb?.current?.features){
        draw.add(clipb.current)
      }
      // const selected = draw.getSelected();
      // console.log("Selected: ", JSON.stringify(selected))
      // setClipboard(selected)
      // draw.delete(selected.features.map((f) => {return f.id;}))
      // console.log("Selected: ", JSON.stringify(selected))
      

    }
    function getDifference(e){
      console.log("Layers: ", mapRef.current.getStyle().layers)
      const data = draw.getAll();
      let polys = []
      let diffs = []
      let intersections = []
      if(data.features.length > 1){
        data.features.forEach(element => {
          console.log("Feature: ", element)
          console.log("Feature Type: ", element.geometry.type)
          if(element.geometry.type == "Polygon"){
            polys.push(element)
          }
        });
      }
      if (polys.length > 1){
        polys.every((poly, index) => {
          polys.every((p, i) => {
            console.log("Going to find difference, for index: ", index, " with index: ", i)
            if( i > index)  {
              console.log("check passed")
              const diff = turf.difference(turf.featureCollection([poly, p]))
              const intersection = turf.intersect(turf.featureCollection([poly, p]))
              const clip = turf.bboxClip(poly, p)
              diffs.push(diff)
              // intersections.push(intersection)
              draw.add(diff)
              // draw.add(intersection)
              // draw.add(clip)
            }
            else{
              return true;
            }
          })
          
        })
      }
      console.log("Diffs: ", diffs)
      if(diffs.length > 0){

      }
    }
    function getIntersects(e){
      console.log("Layers: ", mapRef.current.getStyle().layers)
      const data = draw.getAll();
      let polys = []
      let diffs = []
      let intersections = []
      if(data.features.length > 1){
        data.features.forEach(element => {
          console.log("Feature: ", element)
          console.log("Feature Type: ", element.geometry.type)
          if(element.geometry.type == "Polygon"){
            polys.push(element)
          }
        });
      }
      if (polys.length > 1){
        polys.every((poly, index) => {
          polys.every((p, i) => {
            console.log("Going to find difference, for index: ", index, " with index: ", i)
            if( i > index)  {
              console.log("check passed")
              // const diff = turf.difference(turf.featureCollection([poly, p]))
              const intersection = turf.intersect(turf.featureCollection([poly, p]))
              // const clip = turf.bboxClip(poly, p)
              // diffs.push(diff)
              intersections.push(intersection)
              // draw.add(diff)
              draw.add(intersection)
              // draw.add(clip)
            }
            else{
              return true;
            }
          })
          
        })
      }
      console.log("Diffs: ", diffs)
      if(diffs.length > 0){

      }
    }
    function getClip(e){
      console.log("Layers: ", mapRef.current.getStyle().layers)
      const data = draw.getAll();
      let polys = []
      let diffs = []
      let intersections = []
      if(data.features.length > 1){
        data.features.forEach(element => {
          console.log("Feature: ", element)
          console.log("Feature Type: ", element.geometry.type)
          if(element.geometry.type == "Polygon"){
            polys.push(element)
          }
        });
      }
      if (polys.length > 1){
        polys.every((poly, index) => {
          polys.every((p, i) => {
            console.log("Going to find difference, for index: ", index, " with index: ", i)
            if( i > index)  {
              console.log("check passed")
              // const diff = turf.difference(turf.featureCollection([poly, p]))
              // const intersection = turf.intersect(turf.featureCollection([poly, p]))
              const clip = turf.bboxClip(poly, p)
              // diffs.push(diff)
              // intersections.push(intersection)
              // draw.add(diff)
              // draw.add(intersection)
              draw.add(clip)
            }
            else{
              return true;
            }
          })
          
        })
      }
      console.log("Diffs: ", diffs)
      if(diffs.length > 0){

      }
    }
    function updateArea(e) {
      const data = draw.getAll();
      setFeatures(data)
      if (data.features.length > 0) {
        data.features.every((f, index) => {
          console.log("Coordinates: ", JSON.stringify(f.geometry.coordinates))
        })
        const area = turf.area(data);
        setRoundedArea(Math.round(area * 100) / 100);
      } else {
        setRoundedArea();
        if (e.type !== 'draw.delete') alert('Click the map to draw a polygon.');
      }
    }
  // }
  }, []);
  function save() {
    alert('saved');
  }
  

  const toggleLayer = (layerId: string) => {
    
    console.log("Layer ID: ", layerId)
    // console.log("Property Layer: ", propertyLayer, typeof(propertyLayer));
    if(layerId == "layer-1") {
      if(sourceLayer != true){
        mapRef.current.setLayoutProperty(layerId, 'visibility', 'visible')
      }else{
        mapRef.current.setLayoutProperty(layerId, 'visibility', 'none')
      }
      setSourceLayer(!sourceLayer)
    }else if(layerId == "legal-boundary"){
      if(legalLayer != true){
        mapRef.current.setLayoutProperty(layerId, 'visibility', 'visible')
      }else{
        mapRef.current.setLayoutProperty(layerId, 'visibility', 'none')
      }
      setLegalLayer(!legalLayer)
    }else if(layerId == "intersection-layer"){
      if(intersectionLayer != true){
        mapRef.current.setLayoutProperty(layerId, 'visibility', 'visible')
      }else{
        mapRef.current.setLayoutProperty(layerId, 'visibility', 'none')
      }
      setIntersectionLayer(!intersectionLayer)
    }else if(layerId == "nz-property"){
      if(propertyLayer != true){
        mapRef.current.setLayoutProperty(layerId, 'visibility', 'visible')
      }else{
        mapRef.current.setLayoutProperty(layerId, 'visibility', 'none')
      }
      setPropertyLayer(!propertyLayer)
    }else if(layerId == "db-landcover"){
      if(landcoverLayer != true){
        mapRef.current.setLayoutProperty(layerId, 'visibility', 'visible')
      }else{
        mapRef.current.setLayoutProperty(layerId, 'visibility', 'none')
      }
      setLandcoverLayer(!landcoverLayer)
    }else if(layerId == "db-slope"){
      if(slopeLayer != true){
        mapRef.current.setLayoutProperty(layerId, 'visibility', 'visible')
      }else{
        mapRef.current.setLayoutProperty(layerId, 'visibility', 'none')
      }
      setSlopeLayer(!slopeLayer)
    }

    // mapRef.current.setLayoutProperty('source-layer-1', 'visibility', {sourceLayer} ? 'visible' : 'none');
    // mapRef.current.setLayoutProperty('source-layer-1', 'visibility', {sourceLayer} ? 'visible' : 'none');
    // console.log("Visibility value: ", propertyLayer)
    // if(propertyLayer != true){ // Reads the value before it changes
    //   mapRef.current.setLayoutProperty('nz-property', 'visibility', 'visible');
      
    // }else{
    //   mapRef.current.setLayoutProperty('nz-property', 'visibility', 'none');

    // }
    // mapRef.current.setLayoutProperty('nz-property', 'visibility', 'none');
    // mapRef.current.setLayoutProperty('legal-boundary', 'visibility', 'none');
    // mapRef.current.setLayoutProperty('layer-1', 'visibility', 'none');
    // mapRef.current.setLayoutProperty('legal-boundary', 'visibility', {propertyLayer} ? 'visible' : 'none');
    // mapRef.current.setLayoutProperty('layer-1', 'visibility', {propertyLayer} ? 'visible' : 'none');
  }

  const activateLayer = (layerId) => {
    // console.log("Layer ID to activate: ", layerId)
    setActiveLayer(layerId);
  }

  const onChangeSourceLayer = () => {
    toggleLayer('layer-1');
  }
  const onChangeImprovementsLayer = () => {
    toggleLayer('db-improvements');
  }
  const onChangeLandBreakdownLayer = () => {
    toggleLayer('land-breakdown-layer');
  }
  const onChangeIntersectionLayer = () => {
    toggleLayer('intersection-layer');
  }
  const onChangePropertyLayer = () => {
    toggleLayer('nz-property');
  }
  const onChangeLandcoverLayer = () => {
    toggleLayer('db-landcover');
  }
  const onChangeSlopeLayer = () => {
    toggleLayer('db-slope');
  }
  const onChangeLegalLayer = () => {
    toggleLayer('legal-boundary');
    
  }
  const toggleSelectMode = () => {
    console.log("Setting Select mode: ", isSelectMode)
    console.log("Set Selection mode: ", isSelectionMode.current)
    setIsSelectMode(!isSelectMode)
    isSelectionMode.current = !isSelectionMode.current;
    console.log("Set Select mode: ", isSelectMode)
    console.log("Set Selection mode: ", isSelectionMode.current)
  }


  const copyMultilayerFeature = () => {
    if (selectedFeature.current != null) {
      console.log('Feature copied:', selectedFeature.current);
    } else {
      console.log('No feature selected to copy.');
    }
  }

  const pasteMultilayerFeature = () => {
    if (selectedFeature.current != null) {
      const targetLayer = activeLayer;
      console.log("Feature: ", selectedFeature.current)
      console.log("Layer: ", targetLayer)

      pasteFeatureIntoLayer(selectedFeature.current, targetLayer);
      // if (selectedFeatureLayer.current !== targetLayer) {
      //   pasteFeatureIntoLayer(selectedFeature.current, targetLayer);
      // } else {
      //   console.log('Cannot paste into the same layer from which the feature was copied.');
      // }
    } else {
      console.log('No feature to paste.');
    }
  }
  const pasteFeatureIntoLayer = (feature, targetLayerId) =>{
    // const targetSource = mapRef.current.getSource('source-' + targetLayerId);
    // console.log("Target Source: ", targetSource)
    console.log("Feature: ", feature)
    console.log("target Layer ID: ", targetLayerId)
    // const targetData = targetSource._data;

    // Remove the existing IDs to prevent conflicts
    const newFeature = JSON.parse(JSON.stringify(feature));
    delete newFeature.id;
    delete newFeature.properties.id;

    // Add the feature to the target layer's data
    // targetData.features.push(newFeature);

    // targetSource.setData(targetData);
    // mbdraw.current.add(newFeature)
    const targetSource = mapRef.current.getSource('legal-boundary');
    const targetData = targetSource._data;
    targetData.features.push(newFeature);
    targetSource.setData(targetData)

    console.log(`Feature pasted into layer ${targetLayerId}`);
  }

  const deselectFeature = () => {
    selectedFeature.current = null;
    selectedFeatureLayer.current = '';
    const highlightSource = mapRef.current.getSource('highlighted-feature');
    highlightSource.setData({
        type: 'FeatureCollection',
        features: []
    });
  }
  const intersectAllFeatures = () => {
    // const layer1Features = mapRef.current.getSource('source-layer-1')._data.features;
    // const layer2Features = mapRef.current.getSource('legal-boundary')._data.features;
    const layer1Features = mapRef.current.queryRenderedFeatures({layers: ['nz-property']});;
    // const layer2Features = mapRef.current.getSource('legal-boundary')._data.features;
    const layer2Features = mbdraw.current.getAll().features;
    console.log("SL: ", layer2Features)
    let intersectionResults = [];

    layer1Features.forEach(feature1 => {
        layer2Features.forEach(feature2 => {
            console.log("Feature1: ", feature1)
            console.log("Feature2: ", feature2)
            const intersection = turf.intersect(turf.featureCollection([feature1, feature2]));
            if (intersection) {
                intersectionResults.push(intersection);
            }
        });
    });

    if (intersectionResults.length > 0) {
        const intersectionSource = mapRef.current.getSource('intersection-layer');
        intersectionSource.setData({
            type: 'FeatureCollection',
            features: intersectionResults
        });
        console.log('Intersection results:', intersectionResults);
    } else {
        console.log('No intersections found.');
    }
  }

  const deleteFeature = () => {
    if (selectedFeature.current && selectedFeatureLayer.current) {
      deleteFeatureFromLayer(selectedFeature, selectedFeatureLayer);
      deselectFeature(); // Deselect after deletion
    } else {
      console.log('No feature selected to delete.');
    }
  }

  const saveToSalesTable = () => {
    const legaldata = mapRef.current.getSource('legal-boundary')._data
    let rewindfeatures = []
    legaldata.features.forEach((feature, index) => {
      // mbdraw.current.add(feature)
      rewindfeatures.push({type: feature.type, geometry: turf.rewind(feature.geometry), properties: {}})
    })
    let geojsondata = {
      "type": "FeatureCollection",
      "features": rewindfeatures,
      
      
    }
    console.log("Here to save: ", geojsondata)
    maputils.saveToSalesTable(turf.rewind(geojsondata)).then((data) => {
      if(data){
        console.log("Data: ", data)
      }
      
    })
    
  }
  const getDBIntersection = () => {
    const legaldata = mapRef.current.getSource('legal-boundary')._data
    let rewindfeatures = []
    legaldata.features.forEach((feature, index) => {
      // mbdraw.current.add(feature)
      rewindfeatures.push({type: feature.type, geometry: turf.rewind(feature.geometry)})
    })
    let geojsondata = {
      "type": "FeatureCollection",
      "features": rewindfeatures,
      
      
    }
    // geojsondata = {"type":"FeatureCollection","features":[{"type":"Feature","state":{},"geometry":{"type":"Polygon","coordinates":[[[175.31626224517822,-37.421043338683795],[175.3292977809906,-37.430807481868214],[175.33076763153076,-37.42982771695307],[175.33779501914978,-37.436515422463955],[175.3391146659851,-37.43529719705389],[175.34144282341003,-37.43430897166507],[175.34457564353943,-37.43223024808659],[175.32646536827087,-37.414976318701434],[175.32010316848755,-37.41699587290265],[175.31968474388123,-37.417592355287255],[175.31941652297974,-37.418955725755566],[175.31909465789795,-37.41959479711854],[175.31811833381653,-37.42021682134103],[175.31768918037415,-37.42066842473098],[175.31626224517822,-37.421043338683795]]]},"properties":{"title_no":"SA700/21","status":"LIVE","type":"Freehold","land_distr":"South Auckland","issue_date":"1938-02-03Z","guarantee":"Guarantee","estate_des":"Fee Simple, 1/1, Allotment 448 Parish of Whangamarino, 2,387,645 m2","number_own":1,"spatial_ex":"F"},"layer":{"id":"nz-property","type":"fill","source":"nz-property","paint":{"fill-color":{"r":1,"g":1,"b":0,"a":1},"fill-opacity":0.5},"layout":{}},"source":"nz-property"},{"type":"Feature","state":{},"geometry":{"type":"Polygon","coordinates":[[[175.34942507743835,-37.42942728760067],[175.3529977798462,-37.43308219096104],[175.36287903785706,-37.432494351414725],[175.36006808280945,-37.42981067744979],[175.34942507743835,-37.42942728760067]]]},"properties":{},"layer":{"id":"intersection-layer","type":"line","source":"intersection-layer","paint":{"line-color":{"r":1,"g":0,"b":1,"a":1},"line-width":1},"layout":{}},"source":"intersection-layer"}],"totalFeatures":2,"numberReturned":2,"crs":{"type":"name","properties":{"name":"urn:ogc:def:crs:EPSG::4326"}}}

    console.log("Here to save: ", geojsondata)
    // geojsondata = mapCoordinates(geojsondata)
    // console.log("Here to save2: ", geojsondata)
    maputils.saveToSalesTable(turf.rewind(geojsondata)).then((data) => {
      if(data){
        console.log("Data: ", data)
      }
    })
    
  }

  const deleteFeatureFromLayer = (feature, layerId) => {
    const source = mapRef.current.getSource(layerId);
    const data = source._data;

    // Filter out the feature to delete
    data.features = data.features.filter(f => f.id !== feature.id);

    // Update the source data
    source.setData(data);

    console.log(`Feature deleted from layer ${layerId}`);
  }

  const landAreaSubmit = () => {
    setShowLandAreaModal(true)
  }

  const recalculateSubtotal = () => {
    const areaInputs = document.querySelectorAll('#bespokeLandAreaForm input[type="number"]:not([readonly])');
    let subTotal = 0;

    areaInputs.forEach(input => {
        subTotal += parseFloat(input.value) || 0;
    });

    document.getElementById('bespokeSubTotal').value = subTotal.toFixed(2);
  }

  const populateLandAreaForm = (landClasses, features) => {
    const formContainer = document.getElementById('bespokeLandAreaForm');

    // Clear any existing rows (excluding the static elements)
    if(formContainer) {
      const existingStaticElements = formContainer.querySelectorAll('#bespokeSubTotalDiv, #bespokeTotalAreaDiv, #bespokeButtonsDiv');
      formContainer.innerHTML = '';

      // Re-append static elements to avoid duplicating them
      existingStaticElements.forEach(element => formContainer.appendChild(element));
    }
    let subTotal = 0;

    landClasses.forEach((landClass, index) => {
        // Calculate the total area for this land class
        let totalArea = 0;
        features.forEach(feature => {
            if (feature.properties.class_name === landClass) {
                const area = turf.area(feature) / 10000; // Convert square meters to hectares
                totalArea += area;
            }
        });

        // Create the row for this land class
        const rowDiv = document.createElement('div');
        rowDiv.style.display = 'flex';
        rowDiv.style.justifyContent = 'space-between';
        rowDiv.style.marginBottom = '10px';

        const label = document.createElement('label');
        label.textContent = landClass;

        const input = document.createElement('input');
        input.type = 'number';
        input.id = `area${index + 1}`;
        input.value = totalArea.toFixed(2);
        input.style.width = '60px';

        // Add an event listener to update the subtotal when manually changed
        input.addEventListener('input', recalculateSubtotal);

        rowDiv.appendChild(label);
        rowDiv.appendChild(input);
        if(formContainer){
          formContainer.appendChild(rowDiv);
        }
        // Add to the subtotal
        subTotal += totalArea;
    });

    // Update the Sub Total field
    document.getElementById('bespokeSubTotal').value = subTotal.toFixed(2);
    
    document.getElementById('bespokeProRataButton').addEventListener('click', function() {
      // Get the values of subtotal and total area
      const subTotal = parseFloat(document.getElementById('bespokeSubTotal').value) || 0;
      const totalArea = parseFloat(document.getElementById('bespokeTotalArea').value) || 0;

      // Check that both values are greater than zero
      if (subTotal > 0 && totalArea > 0) {
          // Calculate the adjustment factor
          const adjustmentFactor = totalArea / subTotal;

          // Get all the area input fields
          const areaInputs = document.querySelectorAll('#bespokeLandAreaForm input[type="number"]:not([readonly])');

          // Store the original areas before applying Pro Rata
          originalAreas.current = {};  // Clear previous values
          originalAreas.current.values = {}
          areaInputs.forEach(input => {
              originalAreas.current.values[input.id] = parseFloat(input.value) || 0;
          });

          // Iterate over each area input to adjust its value
          areaInputs.forEach(input => {
              const originalArea = originalAreas.current.values[input.id];
              const newArea = originalArea * adjustmentFactor;
              input.value = newArea.toFixed(2); // Update the input value with the new area
          });

          // Update the subtotal to match the total area after pro rata adjustment
          document.getElementById('bespokeSubTotal').value = totalArea.toFixed(2);
      } else {
          alert('Please ensure that both the subtotal and total area are greater than 0.');
      }
    });

    document.getElementById('bespokeUndoButton').addEventListener('click', function() {
      // Check if originalAreas has been populated
      if (Object.keys(originalAreas.current.values).length === 0) {
          alert('No changes to undo.');
          return;
      }

      // Get all the area input fields
      const areaInputs = document.querySelectorAll('#bespokeLandAreaForm input[type="number"]:not([readonly])');

      // Iterate over each area input to restore its original value
      areaInputs.forEach(input => {
          if (originalAreas.current.values.hasOwnProperty(input.id)) {
              input.value = originalAreas.current.values[input.id].toFixed(2); // Restore the original area value
          }
      });

      // Recalculate the subtotal
      recalculateSubtotal();
    });
  }

  const bespokeLandProcesses = () => {
    maputils.fetchLandCoverAnalysis().then((data) => {
      console.log("Data fetched: ", data)

      let geojsondata = {
        "type": "FeatureCollection",
        "features": data.data.map(feature => ({
          type: "Feature",
          geometry: feature.geom,  // Assuming 'geom' is already in GeoJSON format
          properties: {
              class_name: feature.class_name,
              slope_area: feature.slope_area
          }
        })),
        "totalFeatures": data?.length,
        "numberReturned": data?.length,
        
      }

      if (mapRef.current.getSource('land-cover-analysis')) {
        mapRef.current.getSource('land-cover-analysis').setData(geojsondata);
        
        const features = mapRef.current.getSource('land-cover-analysis')._data ? mapRef.current.getSource('land-cover-analysis')._data.features : [];

        // Get unique land classes from the features
        const landClasses = getUniqueLandClasses(features);

        console.log("landClasses: ", landClasses)

        // Populate the modal with dynamic rows based on the land classes
        // populateLandAreaForm(landClasses, features);
        populateAnalysisForm(landClasses, features);

        
      }

    })
  }

  const populateAnalysisForm = (landClasses, features) => {
    landCoverAnalysisFormFields.current = {landClasses: {}, totalArea: 0.0}
    landClasses.forEach((landClass) => {
      landCoverAnalysisFormFields.current.landClasses[landClass] = 0.0
      features.forEach((feature) => {
        if (feature.properties.class_name === landClass) {
          const area = turf.area(feature) / 10000; // Convert square meters to hectares
          landCoverAnalysisFormFields.current.landClasses[landClass] += area;
          landCoverAnalysisFormFields.current.totalArea += area;
        }
      })
    })
  }

  const bespokeLandAreaSubmit = () => {
    setShowBespokeLandAreaModal(true)
    
    
    // setShowBespokeLandAreaModal(true)
  }
  // const bespokeLandAreaSubmit = () => {
  //   supabase.rpc('land_cover_analysis_v15', {}).then((data) => {
  //     console.log("Data fetched: ", data)

  //     let geojsondata = {
  //       "type": "FeatureCollection",
  //       "features": data.data.map(feature => ({
  //         type: "Feature",
  //         geometry: feature.geom,  // Assuming 'geom' is already in GeoJSON format
  //         properties: {
  //             class_name: feature.class_name,
  //             slope_area: feature.slope_area
  //         }
  //       })),
  //       "totalFeatures": data?.length,
  //       "numberReturned": data?.length,
        
  //     }

  //     if (mapRef.current.getSource('land-cover-analysis')) {
  //       mapRef.current.getSource('land-cover-analysis').setData(geojsondata);
        
  //       const features = mapRef.current.getSource('land-cover-analysis')._data ? mapRef.current.getSource('land-cover-analysis')._data.features : [];

  //       // Get unique land classes from the features
  //       const landClasses = getUniqueLandClasses(features);

  //       console.log("landClasses: ", landClasses)

  //       setShowBespokeLandAreaModal(true)
  //       // Populate the modal with dynamic rows based on the land classes
  //       populateLandAreaForm(landClasses, features);

        
  //     }

  //   })
    
  //   // setShowBespokeLandAreaModal(true)
  // }
  const userLandBreakdownSubmit = () => {
    setShowLandAreaModal(true)
  }

  return (
    <>
      <div className='h-16' id="toolbar"></div>
      <div className='grid grid grid-cols-8'>
        <div id="left-bar" className='col-span-1'>
          {/* <p>Layers: {mapRef.current.lay}</p> */}
          <div id="sidebar">
              <h2>Layers</h2>
              {/* <div onClick={() => {activateLayer('layer-1')}} id="layer1" className={'layer-item p-[5px] mx-[5px] rounded-[5px] cursor-pointer ' + ((activeLayer == "layer-1") ? "bg-cyan-300" : "bg-grey-300")}>
                  <input type="checkbox" id="toggleLayer1" checked={sourceLayer} onChange={onChangeSourceLayer} />
                  <label htmlFor="toggleLayer1">Layer 1: Source Layer 1</label>
              </div> */}
              <div onClick={() => {activateLayer('db-improvements')}} id="improvements-layer" className={'layer-item p-[5px] mx-[5px] rounded-[5px] cursor-pointer ' + ((activeLayer == "db-improvements") ? "bg-cyan-300" : "bg-grey-300")}>
                  <input type="checkbox" id="toggle-improvements-layer" checked={improvementsLayer} onChange={onChangeImprovementsLayer} />
                  <label htmlFor="toggle-improvements-layer">Improvements Layer</label>
              </div>
              <div onClick={() => {activateLayer('land-breakdown-layer')}} id="land-breakdown-layer" className={'layer-item p-[5px] mx-[5px] rounded-[5px] cursor-pointer ' + ((activeLayer == "land-breakdown-layer") ? "bg-cyan-300" : "bg-grey-300")}>
                  <input type="checkbox" id="toggle-land-breakdown-layer" checked={landBreakdownLayer} onChange={onChangeLandBreakdownLayer} />
                  <label htmlFor="toggle-land-breakdown-layer">User Land Breakdown Layer</label>
              </div>
              <div onClick={() => {activateLayer('intersection-layer')}} id="layer1" className={'layer-item p-[5px] mx-[5px] rounded-[5px] cursor-pointer ' + ((activeLayer == "intersection-layer") ? "bg-cyan-300" : "bg-grey-300")}>
                  <input type="checkbox" id="toggleIntersectionLayer" checked={intersectionLayer} onChange={onChangeIntersectionLayer} />
                  <label htmlFor="toggleIntersectionLayer">Intersection Layer</label>
              </div>
              <div onClick={() => {activateLayer('legal-boundary')}} id="layer2" className={'layer-item p-[5px] mx-[5px] rounded-[5px] cursor-pointer ' + ((activeLayer == "legal-boundary") ? "bg-cyan-300" : "bg-grey-300")}>
                  <input type="checkbox" id="toggleLayer2" checked={legalLayer}  onChange={onChangeLegalLayer} />
                  <label htmlFor="toggleLayer2">User Legal Boundary</label>
              </div>
              <div onClick={() => {activateLayer('nz-property')}} id="layer3" className={'layer-item p-[5px] mx-[5px] rounded-[5px] cursor-pointer ' + ((activeLayer == "nz-property") ? "bg-cyan-300" : "bg-grey-300")}>
                  <input type="checkbox" id="toggleLayer3" checked={propertyLayer} onChange={onChangePropertyLayer} />
                  <label htmlFor="toggleLayer3">NZ Property Titles</label>
              </div>
              <div onClick={() => {activateLayer('db-landcover')}} id="layer3" className={'layer-item p-[5px] mx-[5px] rounded-[5px] cursor-pointer ' + ((activeLayer == "db-landcover") ? "bg-cyan-300" : "bg-grey-300")}>
                  <input type="checkbox" id="toggleLandcoverLayer" checked={landcoverLayer} onChange={onChangeLandcoverLayer} />
                  <label htmlFor="toggleLandcoverLayer">Bespoke Land cover</label>
              </div>
              <div onClick={() => {activateLayer('db-slope')}} id="layer3" className={'layer-item p-[5px] mx-[5px] rounded-[5px] cursor-pointer ' + ((activeLayer == "db-slope") ? "bg-cyan-300" : "bg-grey-300")}>
                  <input type="checkbox" id="toggleSlopeLayer" checked={slopeLayer} onChange={onChangeSlopeLayer} />
                  <label htmlFor="toggleSlopeLayer">Bespoke Slope</label>
              </div>
              <button id="selectButton" onClick={toggleSelectMode}>Select Feature</button>
              <button id="deselectButton" onClick={deselectFeature}>Deselect Feature</button>
              <button id="copyButton" onClick={copyMultilayerFeature}>Copy Feature</button>
              <button id="pasteButton" onClick={pasteMultilayerFeature}>Paste Feature</button>
              <button id="deleteButton" onClick={deleteFeature}>Delete Feature</button>
              <button id="intersectionButton" onClick={intersectAllFeatures}>Intersect All Features</button>
              <button id="save" onClick={saveToSalesTable}>Save Legal Boundary To Sales</button>
              <button id="save-land-area" onClick={landAreaSubmit}>User Land Area Submit</button>
              <button id="save-user-land-breakdown" onClick={userLandBreakdownSubmit}>User Land Breakdown Submit</button>
              <button id="save-user-land-breakdown" onClick={bespokeLandAreaSubmit}>Bespoke Land Area Submit</button>
              <button id="save-user-land-breakdown" onClick={bespokeLandProcesses}>Bespoke Land Processes</button>
          </div>

        </div>
        <div id="left-bar" className='col-span-7'>
          <>
            <div ref={mapContainerRef} id="map" style={{ height: '500px' }}></div>
            <div
              className="calculation-box hidden"
              style={{
                // height: 75,
                width: 150,
                position: 'absolute',
                bottom: 40,
                left: 10,
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                padding: 15,
                textAlign: 'center'
              }}
            >
              <p style={paragraphStyle}>Click the map to draw a polygon.</p>
              <div id="calculated-area">
                {roundedArea && (
                  <>
                    <p style={paragraphStyle}>
                      <strong>{roundedArea}</strong>
                    </p>
                    <p style={paragraphStyle}>square meters</p>
                  </>
                )}
                {/* {features && (
                  <p style={paragraphStyle}>
                  <>
                      <strong>{JSON.stringify(features)}</strong>
                    </p>
                    <p style={paragraphStyle}>square meters</p>
                  </>
                )} */}
              </div>
            </div>
          </>
        </div>
      </div>
      {showLandAreaModal && <LandAreaModal />}

      <BespokeLandAreaModal  showModal={showBespokeLandAreaModal}/>
      {showLandAreaModal && <LandAreaModal />}
      
    </>
  );
};



export default MapboxPage;