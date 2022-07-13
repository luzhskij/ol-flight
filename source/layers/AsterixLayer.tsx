import * as $ from "jquery"; // import Jquery here

import Map from "ol/Map";

import LayerGroup from "ol/layer/Group";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Feature from "ol/Feature";
import GeoJSON from "ol/format/GeoJSON";
import * as olLoadingstrategy from "ol/loadingstrategy";
import { Point, LineString } from "ol/geom";

import { Icon, Style, Circle, Fill, Text, Stroke } from "ol/style";

/* circle ask to local */

export let exampleAsterixSource, exampleAsterixLayer;
export let overlayAsterLayerGroup;

import { layerSetZIndexBase } from "../modules/app";

function doChainedAjaxForArray(arr, index) {
  if (index < 0 || index >= arr.length) return;

  let query2 = "http://192.168.1.194:60/get_asterix_line.php";
  query2 += "?name=";
  query2 += arr[index];
  let last_query = query2;

  $.ajax({
    url: last_query,
    type: "GET",
    success: (json_result) => {
      if (!json_result) {
        return;
      }

      let features = new GeoJSON().readFeatures(json_result, {
        dataProjection: "EPSG:4326",
        featureProjection: "EPSG:3857",
      });

      if (!features) {
        return;
      }

      exampleAsterixSource.addFeatures(features);

      let feature_zero: any = features[0];
      let cc = feature_zero.getGeometry()?.getCoordinates().length;

      let lastpoint = feature_zero.getGeometry()?.getCoordinates()[cc - 1];

      let markerLast = new Feature(new Point(lastpoint));
      markerLast.set("point", "start");
      markerLast.set("callsign", features[0].getProperties()["callsign"]);
      exampleAsterixSource.addFeature(markerLast);

      let firstpoint = feature_zero.getGeometry()?.getCoordinates()[0];
      let markerFirst = new Feature(new Point(firstpoint));
      markerFirst.set("point", "finish");
      markerFirst.set("callsign", features[0].getProperties()["callsign"]);
      exampleAsterixSource.addFeature(markerFirst);

      doChainedAjaxForArray(arr, index + 1);
    },
  });
}

function get_asterix_information(air_names) {
  doChainedAjaxForArray(air_names, 0);
}

function getJSON(url, func) {
  console.info("2222");
  $.ajax({
    url: url,
    type: "GET",
    dataType: "json",
    xhrFields: { withCredentials: true },
    success: func,
  });
}

export const asterix_prepare_work = () => {
  let onlynames: String[] = [];
  const promise = new Promise((resolve) => {
    getJSON("./assets/data/asterix_list.json", function (adata) {
      if (adata.aircrafts != null) {
        adata.aircrafts.forEach(function (airf: String) {
          onlynames.push(airf);
        });
        resolve(true);
      } else {
        console.warn("Empty list aircrafts");
        resolve(false);
      }
    });
  });
  promise
    .then((value) => {
      get_asterix_information(onlynames);
    })
    .catch((value) => {
      console.log(value, "catch");
    })
    .finally(() => {
      console.log("End finally");
    });
};

/* circle ask to local */

function degrees_to_radians(degrees) {
  var pi = Math.PI;
  return degrees * (pi / 180);
}

let styleFunctionExampleAsterixPoint1 = function (feature, resolution) {
  let styles: Style[] = [];

  if (feature.getProperties()["point"] != undefined) {
    let lineStyle0: Style = new Style({});

    let emptIcon = new Icon({
      anchor: [0.5, 0.5],
      anchorXUnits: "fraction",
      anchorYUnits: "fraction",
      src: "./assets/img/empty.png",
    });

    let startIcon = new Icon({
      anchor: [0.5, 0.5],
      anchorXUnits: "fraction",
      anchorYUnits: "fraction",
      src: "./assets/img/startasts.png",
    });

    let finishIcon = new Icon({
      anchor: [0.5, 0.5],
      anchorXUnits: "fraction",
      anchorYUnits: "fraction",
      src: "./assets/img/finishasts.png",
    });

    if (feature.getProperties()["point"] == "start") {
      lineStyle0.setImage(startIcon);
    } else if (feature.getProperties()["point"] == "finish") {
      lineStyle0.setImage(finishIcon);
    } else {
      lineStyle0.setImage(emptIcon);
    }

    styles.push(lineStyle0);
    return styles;
  }

  var myStyle = new Style({
    image: new Circle({
      radius: 2,
      fill: new Fill({ color: "orange" }),
      stroke: new Stroke({
        color: "black",
        width: 1,
      }),
    }),
    stroke: new Stroke({
      color: "red",
      width: 4,
    }),
  });
  styles.push(myStyle);

  return styles;
};

const create_asterix_layer = () => {
  exampleAsterixSource = new VectorSource({
    title: "Asterix 1",
    attribution: "Example Asterix 1",
    strategy: olLoadingstrategy.bbox,
    format: GeoJSON,
  } as any);

  exampleAsterixLayer = new VectorLayer({
    //background: "#1a2b39",
    name: "asterix_1",
    title: "Asterix 1",
    attribution: "Example Asterix",
    source: exampleAsterixSource,
    visible: false,
    zIndex: layerSetZIndexBase["test"],
    style: styleFunctionExampleAsterixPoint1,
  } as any);

  overlayAsterLayerGroup = new LayerGroup({
    // A layer must have a title to appear in the layerswitcher
    title: "Asterix Local",
    fold: "open",
    visible: false,
    layers: [exampleAsterixLayer],
    openInLayerSwitcher: true,
    displayInLayerSwitcher: true,
  } as any);
};

export const AddAsterixLayers = (map: Map) => {
  create_asterix_layer();

  map.addLayer(overlayAsterLayerGroup);
};
