import Map from "ol/Map";
import LayerGroup from "ol/layer/Group";

import { Collection } from "ol";

import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";

import Feature from 'ol/Feature';
import GeoJSON from 'ol/format/GeoJSON';
import VectorSource from "ol/source/Vector";
import TileWMS from "ol/source/TileWMS";
import XYZ from "ol/source/XYZ";
import OSM from "ol/source/OSM";
import Stamen from "ol/source/Stamen";
import Cluster from "ol/source/Cluster";

import Style from "ol/style/Style";
import CircleStyle from "ol/style/Circle";
import Fill from "ol/style/Fill";
import Icon from "ol/style/Icon";

import * as olLoadingstrategy from "ol/loadingstrategy";

import DayNight from "ol-ext/source/DayNight";

//import ol_source_PhpPostgis from "../utility/php_postgis";
//import ol_source_LoadOpenSkyData from "./load_opensky_data";

//export let loc_url = "./assets/php/postgis_geojson.php?";
export let loc_url =
  "http://192.168.1.194:85/map/assets/php/postgis_geojson.php?"; // in my develop

import {
  styleFunctionExtPoint,
  styleFunctionExtLine,
  styleFunctionExtPoly,
  styleOpenSky,
  styleFunctionExamplePoint1,
} from "./layers_styles";
import { getStyleSwitcher } from "./layers_styles";

import { layerSetZIndexBase } from "../modules/app";

/* Additional */
/*
export let overlayAdditionalLayerGroup;
export let exampleDNlayer, openSkyNetworkLayer;

export function create_additional_layers() {
  overlayAdditionalLayerGroup = new LayerGroup({
    title: "Additional layers",
    layers: [],
    visible: false,
  } as any);

  let vectorSourcednt = new DayNight({});

  exampleDNlayer = new VectorLayer({
    title: "DayNight",
    attribution: "Example daynight",
    source: vectorSourcednt,
    visible: false,
    zIndex: layerSetZIndexBase["day_night"],
    style: new Style({
      image: new CircleStyle({
        radius: 5,
        fill: new Fill({ color: "red" }),
      }),
      fill: new Fill({
        color: [0, 0, 50, 0.5],
      }),
    }),
  } as any);

  let openSkyNetworkSource = new ol_source_LoadOpenSkyData({
    url: "https://opensky-network.org/api/states/all",
    strategy: olLoadingstrategy.bbox,
    attributions: "OpenSky Network",
  });

  openSkyNetworkLayer = new VectorLayer({
    name: "aircraft",
    title: "OpenSky States",
    source: openSkyNetworkSource,
    visible: false,
    zIndex: layerSetZIndexBase["aircrafts"],
    style: styleOpenSky,
  } as any);

  overlayAdditionalLayerGroup.setLayers(
    new Collection([openSkyNetworkLayer, exampleDNlayer])
  );
}
*/
/* Additional */

/* NITA Layers */
export let overlayNitaLayerGroup;
export let nitaPolyRSAsource, nitaPointARPsource, nitaLineTracksource;
export let nitaPointARPcluster;
export let nitaPolyRSAlayer, nitaPointARPlayer, nitaLineTrackLayer;


const create_test = () => {
  /*
    nitaPolyRSAsource = new VectorSource({//new ol_source_PhpPostgis({
      title: "zapret new s",
      attributions: "NITA Data Planeta",
      filter: ["type=poly_zone_pra"],
      strategy: olLoadingstrategy.bbox,
      url: loc_url,
      features: new GeoJSON(),
    } as any);
  */

  const vectorSource = new VectorSource({
    format: new GeoJSON({
      projection: 'EPSG:3857',
    } as any),
  } as any);
  
  const vectorLayer = new VectorLayer({
    source: vectorSource,
  });

};

export function create_nita_layers() {
  nitaPolyRSAsource = new VectorSource({//new ol_source_PhpPostgis({
    title: "zapret new s",
    attributions: "NITA Data Planeta",
    filter: ["type=poly_zone_pra"],
    strategy: olLoadingstrategy.bbox,
    url: loc_url,
  } as any);

  nitaPolyRSAlayer = new VectorLayer({
    title: "RSA (Poly)",
    name: "rsa_poly",
    source: nitaPolyRSAsource,
    visible: false,
    zIndex: layerSetZIndexBase["rsa_l"],
    style: styleFunctionExtPoly,
  } as any);
  //-------poly rsa-----

  //---------point arp----------------

  nitaPointARPsource = new VectorSource({//new ol_source_PhpPostgis({
    title: "ARP - Point s2",
    attributions: "NITA Data Planeta",
    filter: [],
    url: loc_url,
    strategy: olLoadingstrategy.bbox,
  } as any);

  const nitaPointARPlayer_standart = new VectorLayer({
    title: "ARP (Point)",
    source: nitaPointARPsource,
    visible: false,
    style: new Style({
      image: new Icon({
        anchor: [0.5, 1.0],
        anchorXUnits: "fraction",
        anchorYUnits: "fraction",
        src: "../assets/img/airplane_2_2.png",
      }),
    }),
    zIndex: layerSetZIndexBase["airports_l"],
  } as any);

  nitaPointARPcluster = new Cluster({
    distance: 25,
    minDistance: 15,
    source: nitaPointARPsource,
    attributions: "NITA Data Planeta",
  });

  nitaPointARPlayer = new VectorLayer({
    title: "ARP (Point)",
    name: "arp_point",
    source: nitaPointARPcluster,
    visible: false,
    zIndex: layerSetZIndexBase["airports_l"],
    style: styleFunctionExtPoint,
  } as any);
  //---------point arp----------------

  //------line track-------

  nitaLineTracksource = new VectorSource({//new ol_source_PhpPostgis({
    title: "Track - Line s2",
    attributions: "NITA Data Planeta",
    filter: ["type=line_track_vt"],
    url: loc_url,
    strategy: olLoadingstrategy.bbox,
  } as any);

  nitaLineTrackLayer = new VectorLayer({
    title: "Track (Line)",
    name: "track_line",
    source: nitaLineTracksource,
    visible: false,
    // style: new Style({
    //     stroke: new ol.style.Stroke({
    //         color: "#3399CC",
    //         width: 1.25,
    //     }),
    // }),    
    zIndex: layerSetZIndexBase["tracks_l"],

    style: styleFunctionExtLine,
  } as any);
  //------line track-------

  //---- summ al layers
  overlayNitaLayerGroup = new LayerGroup({
    // A layer must have a title to appear in the layerswitcher
    title: "NITA",
    fold: "close",
    visible: false,
    layers: [nitaPolyRSAlayer, nitaLineTrackLayer, nitaPointARPlayer],
  } as any);
}
/* NITA Layers */

/* Layers for test */
export let overlayTestLayerGroup;

export function create_layers_for_test() {
  overlayTestLayerGroup = new LayerGroup({
    title: "Test Layers",
    layers: [],
    visible: false,
  } as any);

  let examplePointSource1 = new VectorSource({// new ol_source_PhpPostgis({
    filter: ["type=point1"],
    url: "http://localhost:8003/postgis_geojson_loc.php?",
    strategy: olLoadingstrategy.bbox,
  } as any);

  const examplePointLayer1 = new VectorLayer({
    title: "Point t1",
    attribution: "Example poly layer 1",
    source: examplePointSource1,
    visible: false,
    zIndex: layerSetZIndexBase["test"],
    style: styleFunctionExamplePoint1,
  } as any);

  let examplePolySource1 = new VectorSource({// new ol_source_PhpPostgis({
    filter: ["type=poly1"],
    url: "http://localhost:8003/postgis_geojson_loc.php?",
    strategy: olLoadingstrategy.bbox,
  } as any);

  const examplePolyLayer1 = new VectorLayer({
    title: "Poly t1",
    attribution: "Example poly layer 1",
    source: examplePolySource1,
    visible: false,
    zIndex: layerSetZIndexBase["test"],
    //style: styleFunctionExamplePoly1,
    style: getStyleSwitcher,
  } as any);

  var exampleLineSource = new VectorSource({//new ol_source_PhpPostgis({
    title: "Line 1",
    attribution: "Example line 1",

    filter: ["type=line_trassa_vt"],

    url: "http://localhost:8003/postgis_geojson_loc.php?",

    strategy: olLoadingstrategy.bbox,
  } as any);

  const exampleLineLayer = new VectorLayer({
    title: "Line 11",
    attribution: "Example line 2",
    source: exampleLineSource,
    visible: false,
    zIndex: layerSetZIndexBase["test"],

    style: styleFunctionExtLine,
  } as any);

  overlayTestLayerGroup.setLayers(
    new Collection([examplePointLayer1, exampleLineLayer, examplePolyLayer1])
  );
}
/* Layers for test */

export const AddVectorLayers = (map: Map) => {
  //create_nita_layers();
  ////create_additional_layers();
  //create_layers_for_test();

  //map.addLayer(overlayTestLayerGroup);
  ////map.addLayer(overlayAdditionalLayerGroup);
  //map.addLayer(overlayNitaLayerGroup);

  create_test();
};
