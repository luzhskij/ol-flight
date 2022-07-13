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

import { transform, transformExtent } from 'ol/proj'
import * as OLGeometry from 'ol/geom'
import * as OLStyle from 'ol/style'


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

export let testVectorLayer, testVectorSource;

const checkCoordinates = (c, w) => {
  if (w == 0) {
    // longitude
    if (c > 180 || c < -180) {
      if (c > 180.0) {
        c = 180.0;
      } else if (c < -180.0) {
        c = -180.0;
      }
    }
  } else {
    // latitude
    if (c > 85.05 || c < -85.05) {
      if (c > 85.05) {
        c = 85.05;
      } else if (c < -85.05) {
        c = -85.05;
      }
    }
  }
  return c;
}

const hasFeature = (source, feature) => {
  var p = feature.getGeometry().getFirstCoordinate();
  var id = feature.getId();
  var existing = source.getFeaturesInExtent([
    p[0] - 0.1,
    p[1] - 0.1,
    p[0] + 0.1,
    p[1] + 0.1,
  ]);
  for (var i = 0, f; (f = existing[i]); i++) {
    if (id === f.getId()) {
      return true;
    }
  }
  return false;
};

const nitaLayerLoader = (params, source, extent, projection) => {
  let bbox = transformExtent(extent, projection, "EPSG:4326");
  let lon_min = checkCoordinates(bbox[0], 0);
  let lon_max = checkCoordinates(bbox[2], 0);
  bbox[0] = lon_min;
  bbox[2] = lon_max;
  if (lon_min > lon_max) {
    bbox[2] = lon_min;
    bbox[0] = lon_max;
  }

  let type_filter = "";
  for (let n = 0, u_filter: string; (u_filter = params.filter[n]); n++) {
    type_filter += "&";
    type_filter += u_filter;
  }

  let full_query = params.url;

  let now = Date.now();
  full_query = full_query + "t=" + now;

  full_query += "&bbox=";
  full_query += bbox.join(",");
  full_query += type_filter;

  console.log(full_query);

  fetch(full_query)
    .then((response) => response.json())
    .then((response) => {

      if (!response) {
        return;
      }

      let features = new GeoJSON().readFeatures(response, {
        dataProjection: "EPSG:4326",
        featureProjection: "EPSG:3857",
      });

      if (features.length > 0) {
        if (features[0].getKeys().indexOf("point_arp") > 0) {
          features.forEach(function (f) {
            f.setId(f.get("point_arp"));
          });
        } else if (features[0].getKeys().indexOf("poly_rsa") > 0) {
          features.forEach(function (f) {
            f.setId(f.get("poly_rsa"));
          });
        } else if (features[0].getKeys().indexOf("track_id") > 0) {
          features.forEach(function (f) {
            f.setId(f.get("track_id"));
          });
        }
      }

      let result: Feature[] = [];

      // Remove duplicated features
      for (let i = 0, f; (f = features[i]); i++) {
        if (!hasFeature(source, f)) {
          result.push(f);
        }
      }

      source.addFeatures(result);

    }).catch(() => { });
};

const create_test = (map: Map) => {
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

  let lfilter = ["type=poly_zone_pra"]

  let params = {
    projection: null,
    extent: [],
    time: 0,
    url: loc_url,
    filter: lfilter,
  };

  testVectorSource = new VectorSource({
    loader: (extent, resolution, projection) => {
      params.extent = extent;
      params.projection = projection;
      nitaLayerLoader(params, testVectorSource, extent, projection);
    },
    strategy: olLoadingstrategy.bbox,
  } as any);

  testVectorLayer = new VectorLayer({
    title: "Test data",
    source: testVectorSource,
    zIndex: layerSetZIndexBase["rsa_l"],
  } as any);

};


const AdditionLayerStyle = (feature) => {

  //console.log( feature );
  // let airangl = feature.get("rotation");
  // let numicon = Math.round(airangl / 15);
  // let iconname = "./assets/images/air_" + numicon + ".png";


  let style = new OLStyle.Style({
    image: new OLStyle.Icon({
      anchor: [0.5, 0.5],
      anchorXUnits: "fraction",
      anchorYUnits: "fraction",
      rotation: feature.get("rotation"),
      src: "./assets/images/air_0.png",
    })
  });

  return [style];
};


const create_nita_polygon_layer = () => {
  //-------poly rsa-----
  let lfilter = ["type=poly_zone_pra","fba_lowh=0","fba_highh=350000"];

  let params = {
    projection: null,
    extent: [],
    time: 0,
    url: loc_url,
    filter: lfilter,
  };

  nitaPolyRSAsource = new VectorSource({
    loader: (extent, resolution, projection) => {
      params.extent = extent;
      params.projection = projection;
      nitaLayerLoader(params, nitaPolyRSAsource, extent, projection);
    },
    strategy: olLoadingstrategy.bbox,
    title: "zapret new s",
    attributions: "NITA Data Planeta",
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
}

const create_nite_line_layer = () => {
  //------line track-------
  let lfilter = ["type=line_track_vt","airway_type=1,2,3,4","airway_rnp=0,2,5,10","airway_typelevel=0,1,2"];

  let params = {
    projection: null,
    extent: [],
    time: 0,
    url: loc_url,
    filter: lfilter,
  };

  nitaLineTracksource = new VectorSource({
    loader: (extent, resolution, projection) => {
      params.extent = extent;
      params.projection = projection;
      nitaLayerLoader(params, nitaLineTracksource, extent, projection);
    },
    strategy: olLoadingstrategy.bbox,
    title: "Track - Line s2",
    attributions: "NITA Data Planeta",
  } as any);

  nitaLineTrackLayer = new VectorLayer({
    title: "Track (Line)",
    name: "track_line",
    source: nitaLineTracksource,
    visible: false,
    zIndex: layerSetZIndexBase["tracks_l"],
    style: styleFunctionExtLine,
  } as any);
  //------line track-------
}

const create_nite_point_layer = () => {
  //---------point arp----------------
  let lfilter = ["type=ports","port_areacode=AFR,CAN,EEU,EUR,LAM,MES,PAC,SAM,SPA,USA","port_spaceclass=A,C,G,HK","port_war_civil=all","port_date_type=actual"];

  let params = {
    projection: null,
    extent: [],
    time: 0,
    url: loc_url,
    filter: lfilter,
  };

  nitaPointARPsource = new VectorSource({
    loader: (extent, resolution, projection) => {
      params.extent = extent;
      params.projection = projection;
      nitaLayerLoader(params, nitaPointARPsource, extent, projection);
    },
    strategy: olLoadingstrategy.bbox,
    title: "ARP - Point s2",
    attributions: "NITA Data Planeta",
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
}

export function create_nita_layers() {
  create_nita_polygon_layer();
  create_nite_line_layer();
  create_nite_point_layer();

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
  create_nita_layers();
  ////create_additional_layers();
  //create_layers_for_test();

  //map.addLayer(overlayTestLayerGroup);
  ////map.addLayer(overlayAdditionalLayerGroup);
  map.addLayer(overlayNitaLayerGroup);

  // create_test(map);
  // map.addLayer(testVectorLayer);

};
