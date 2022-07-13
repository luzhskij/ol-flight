import Icon from "ol/style/Icon";
import Style from "ol/style/Style";
import Text from "ol/style/Text";
import Fill from "ol/style/Fill";
import Stroke from "ol/style/Stroke";

import * as olCoordinate from "ol/coordinate";

import MultiLineString from "ol/geom/MultiLineString";
import Polygon from "ol/geom/Polygon";
import LineString from "ol/geom/LineString";

import { degrees_to_radians } from "../utility/hutils";
import { toMultiArcs } from "../utility/hutils";

//import { get_current_zoom } from "./index";

/**
 * generate styles
 */

// -------------------------------------------------------------------
// tests
export let styleFunctionExamplePoint1 = function (feature, resolution) {
  let styles: Style[] = [];

  let lineStyle0 = new Style({});

  let emptIcon = new Icon({
    anchor: [0.5, 0.5],
    anchorXUnits: "fraction",
    anchorYUnits: "fraction",
    src: "./assets/img/empty.png",
  });

  let aerpIcon = new Icon({
    anchor: [0.5, 0.5],
    anchorXUnits: "fraction",
    anchorYUnits: "fraction",
    src: "./assets/img/aerpt4.png",
  });

  let hellIcon = new Icon({
    anchor: [0.5, 0.5],
    anchorXUnits: "fraction",
    anchorYUnits: "fraction",
    src: "./assets/img/hell2.png",
  });

  let terminalIcon = new Icon({
    anchor: [0.5, 0.5],
    anchorXUnits: "fraction",
    anchorYUnits: "fraction",
    src: "./assets/img/aerpterm.png",
  });

  let gateIcon = new Icon({
    anchor: [0.5, 0.5],
    anchorXUnits: "fraction",
    anchorYUnits: "fraction",
    src: "./assets/img/gate.png",
  });

  let otherIcon = new Icon({
    anchor: [0.5, 0.5],
    anchorXUnits: "fraction",
    anchorYUnits: "fraction",
    src: "./assets/img/other.png",
  });

  var srcsvg = "../assets/img/arrow.png";
  let svgIcon = new Icon({
    src: srcsvg,
    //size: [50, 66],
    anchor: [0.5, 0.5],
    rotation: degrees_to_radians(90),
    //offset: [0, -50],
    //scale: 0.5
  });

  let attrKey = feature.getProperties()["aeroway"];

  if (attrKey != null) {
    if (attrKey == "aerodrome") {
      lineStyle0.setImage(aerpIcon);
      //lineStyle0.getImage().setRotation(60);
    } else if (attrKey == "helipad") {
      lineStyle0.setImage(hellIcon);
      //lineStyle0.getImage().setRotation(45);
    } else if (attrKey == "terminal") {
      lineStyle0.setImage(terminalIcon);
      //lineStyle0.getImage().setRotation(90);
    } else if (attrKey == "gate") {
      lineStyle0.setImage(gateIcon);
      //lineStyle0.getImage().setRotation(90);
    } else if (attrKey == "airstrip") {
      lineStyle0.setImage(svgIcon);
      //lineStyle0.getImage().setRotation(90);
    } else {
      lineStyle0.setImage(otherIcon);
    }
  } else {
    lineStyle0.setImage(emptIcon);
  }

  let text1 = new Text({
    font: 'bold 11px "Open Sans", "Arial Unicode MS", "sans-serif"',
    placement: "point",
    fill: new Fill({ color: "#fff" }),
    stroke: new Stroke({ color: "#000", width: 2 }),
    text: feature.get("name"),
    offsetY: -15,
    rotateWithView: true,
  });
  lineStyle0.setText(text1);

  styles.push(lineStyle0);
  return styles;
};

export let styleFunctionExamplePoly1 = function (feature, resolution) {
  let styles: Style[] = [];

  let lineStyle0 = new Style({
    stroke: new Stroke({
      color: "red",
      width: 4,
    }),
    fill: new Fill({
      color: "rgba(255,255,255,0.4)",
    }),
  });

  let attrKey = feature.getProperties()["aeroway"];
  if (attrKey != null) {
    if (attrKey == "aerodrome") {
      lineStyle0.getStroke().setColor("crimson");
      lineStyle0.getStroke().setWidth(1.5);
      lineStyle0.getFill().setColor("rgba(0,0,0,0.0)");
    } else if (attrKey == "apron") {
      lineStyle0.getStroke().setColor("green");
      lineStyle0.getStroke().setWidth(1.9);
      lineStyle0.getFill().setColor("rgba(100,250,0,0.1)");
    } else if (attrKey == "terminal") {
      lineStyle0.getStroke().setColor("red");
      lineStyle0.getStroke().setWidth(2);
      lineStyle0.getFill().setColor("rgba(250,0,0,0.1)");
    } else {
      lineStyle0.getStroke().setColor("white");
      lineStyle0.getStroke().setWidth(1);
      lineStyle0.getFill().setColor("black");
    }
  }

  styles.push(lineStyle0);

  return styles;
};

// Offset geometry
// export function offsetGeometry(feature, size) {
//   switch (feature.getGeometry().getType()) {
//     case "Polygon":
//       var coords = feature.getGeometry().getCoordinates();
//       var sign = feature.getGeometry().getLinearRing(0).getArea() < 0 ? -1 : 1;
//       coords[0] = olCoordinate.offsetCoords(coords[0], sign * size);
//       return new Polygon(coords);
//     case "LineString":
//       var coords = feature.getGeometry().getCoordinates();
//       coords = olCoordinate.offsetCoords(coords, size);
//       return new LineString(coords);
//     default:
//       return feature.getGeometry();
//   }
// }

// Style function with offset hash
// export function getStyleOffset(feature, res) {
//   //var offset = parseInt($("#offset").val());
//   var offset = 4;
//   return [
//     new Style({
//       stroke: new Stroke({
//         width: 4,
//         color: "rgba(255, 0, 0, 0.518)",
//       }),
//     }),
//     new Style({
//       stroke: new Stroke({
//         color: "rgba(255, 0, 0, 0.318)",
//         width: offset > 0 ? 2 * offset : -2 * offset,
//         lineDash: [1.5, 10],
//         lineCap: "butt",
//         lineJoin: "bevel",
//       }),
//       // Offset geometry
//       geometry: function (feature) {
//         return offsetGeometry(feature, offset * res);
//       },
//     }),
//   ];
// }

export function getStyleSwitcher(feature, res) {
  /*
      if (get_current_zoom() > 14) {
          return getStyleOffset(feature, res); непонятная ошибка, не найти модуль
      } else {
          return styleFunctionExamplePoly1(feature, res);
      }
      */
  return styleFunctionExamplePoly1(feature, res);
}

// tests
// -------------------------------------------------------------------

// style for RSA polygon
export const styleFunctionExtPoly = (feature, resolution) => {
  var geom = feature.getGeometry();
  var styles: Style[] = [];

  var lineStyle = new Style({
    stroke: new Stroke({
      color: "rgba(255, 0, 0, 0.518)",
      width: 4,
    }),
  });

  var gMlns = new MultiLineString(geom.getCoordinates());
  lineStyle.setGeometry(gMlns);

  styles.push(lineStyle);

  return styles;

  //----------------------------------------------------
  /*
  var extent = geom.getExtent();

  var fit =
    Math.min(ol.extent.getWidth(extent), ol.extent.getHeight(extent)) / 4;

  var widths = Math.min(20, fit / resolution);

  //var widths = 12 / Math.max(1, resolution / 10);

  var dist = (widths * resolution * -1) / 2;
  var trfgeo = convertToTurfGeometry(geom);

  //var trfbuff = turf.transformScale(trfgeo, 0.7, { origin: 'center' });
  var trfbuff = turf.buffer(trfgeo, dist, { units: "meters" });

  if (trfbuff) {
    var tchk = turf.difference(trfgeo, trfbuff);
    if (tchk) {
      //console.info("piu piu piu");
      var fs = turf.toMercator(tchk);

      var lineStyle2 = new Style({
        fill: new Fill({
          color: "rgba(255, 0, 0, 0.218)",
        }),
        stroke: new Stroke({
          color: "rgba(255, 0, 0, 0.218)",
          width: 1,
          lineJoin: "join",
        }),
      });
    } else {
      var fs = turf.toMercator(trfbuff);
      var lineStyle2 = new Style({
        fill: new Fill({
          color: "rgba(51, 40, 92, 0.788)",
        }),
        stroke: new Stroke({
          color: "blue",
          width: widths,
          lineJoin: "join",
        }),
      });
    }

    var multiPolygonFeature = new ol.format.GeoJSON().readFeature(fs);
    lineStyle2.setGeometry(multiPolygonFeature.getGeometry());
    styles.push(lineStyle2);
  } else {
    //console.info("q");
  }

  return styles;
  */
};

// style for ARP point
export const styleFunctionExtPoint = (feature, resolution) => {
  let styles: Style[] = [];

  const fsize = feature.get("features").length;

  let emptIcon = new Icon({
    anchor: [0.5, 0.5],
    anchorXUnits: "fraction",
    anchorYUnits: "fraction",
    src: "../assets/img/empty.png",
  });

  var lineStyle0 = new Style({});

  if (fsize == 1) {
    let aerpIcon = new Icon({
      anchor: [0.5, 0.5],
      anchorXUnits: "fraction",
      anchorYUnits: "fraction",
      src: "../assets/img/aerpt4.png",
    });

    let hellIcon = new Icon({
      anchor: [0.5, 0.5],
      anchorXUnits: "fraction",
      anchorYUnits: "fraction",
      src: "../assets/img/hell2.png",
    });

    let terminalIcon = new Icon({
      anchor: [0.5, 0.5],
      anchorXUnits: "fraction",
      anchorYUnits: "fraction",
      src: "../assets/img/aerpterm.png",
    });

    let gateIcon = new Icon({
      anchor: [0.5, 0.5],
      anchorXUnits: "fraction",
      anchorYUnits: "fraction",
      src: "../assets/img/gate.png",
    });

    let otherIcon = new Icon({
      anchor: [0.5, 0.5],
      anchorXUnits: "fraction",
      anchorYUnits: "fraction",
      src: "../assets/img/other.png",
    });

    let oneFeat = feature.get("features");
    let attrKey = oneFeat[0].getProperties()["aeroway"];

    if (attrKey != null) {
      if (attrKey == "aerodrome") {
        lineStyle0.setImage(aerpIcon);
        //lineStyle0.getImage().setRotation(60);
      } else if (attrKey == "helipad") {
        lineStyle0.setImage(hellIcon);
        //lineStyle0.getImage().setRotation(45);
      } else if (attrKey == "terminal") {
        lineStyle0.setImage(terminalIcon);
        //lineStyle0.getImage().setRotation(90);
      } else if (attrKey == "gate") {
        lineStyle0.setImage(gateIcon);
        //lineStyle0.getImage().setRotation(90);
      } else {
        lineStyle0.setImage(otherIcon);
      }
    } else {
      lineStyle0.setImage(aerpIcon);
    }
  } else {
    lineStyle0.setImage(emptIcon);

    let sztText = new Text({
      text: fsize.toString(),
      fill: new Fill({
        color: "black",
      }),
      stroke: new Stroke({
        color: "white",
        width: 1,
      }),
      font: "bold 18px Arial, Verdana, Helvetica, sans-serif",
    });
    lineStyle0.setText(sztText);
  }

  styles.push(lineStyle0);
  return styles;
};

// style for TRACK lines
export const styleFunctionExtLine = (feature, resolution) => {
  if (feature.getGeometry().getType() != "MultiLineString") {
    toMultiArcs(feature);
  }

  let styles: Style[] = [];

  let lineStyle0 = new Style({
    stroke: new Stroke({
      color: "green",
      width: 4,
    }),
  });

  let attrKey = feature.getProperties()["airway_typeid"];
  if (attrKey != null) {
    if (attrKey == "1") {
      lineStyle0.getStroke().setColor("rgba(220, 20, 60, 0.5)");
      lineStyle0.getStroke().setWidth(2);
    } else if (attrKey == "2") {
      lineStyle0.getStroke().setColor("rgba(0, 206, 209, 0.5)");
      lineStyle0.getStroke().setWidth(2);
    } else if (attrKey == "3") {
      lineStyle0.getStroke().setColor("rgba(0, 0, 0, 0.5)");
      lineStyle0.getStroke().setWidth(2);
    } else if (attrKey == "4") {
      lineStyle0.getStroke().setColor("rgba(138, 43, 226, 0.5)");
      lineStyle0.getStroke().setWidth(2);
    }
  }

  styles.push(lineStyle0);

  return styles;
};
/* generate styles */

/**
 * OpenSky styles
 */
export let styleOpenSky = function (feature, resolution) {
  let styles: Style[] = [];

  let airangl = feature.get("true_track");

  let numicon = Math.round(airangl / 15);
  let iconname = "../assets/img_rot/air_" + numicon + ".png";
  /*
            // Shadow style
            styles.push(
                new Style({
                    image: new ol.style.Shadow({
                        radius: 12,
                        blur: 5,
                        offsetX: 0,
                        offsetY: 0,
                        fill: new Fill({
                            color: "rgba(0,0,0,0.5)",
                        }),
                    }),
                })
            );
  */
  let emptIcon = new Icon({
    anchor: [0.5, 0.5],
    anchorXUnits: "fraction",
    anchorYUnits: "fraction",
    //src: "./assets/img_rot/aircrft4.png",
    src: iconname,
  });

  var lineStyle0 = new Style({});
  lineStyle0.setImage(emptIcon);

  //lineStyle0.getImage().setRotation(degrees_to_radians(airangl));

  /* *etsttestetstetstetst* */
  let torottext = 0;
  if (airangl <= 180) {
    torottext = degrees_to_radians(airangl - 90);
  } else {
    torottext = degrees_to_radians(airangl + 90);
  }

  let text1 = new Text({
    font: 'bold 11px "Open Sans", "Arial Unicode MS", "sans-serif"',
    placement: "point",
    fill: new Fill({ color: "#fff" }),
    stroke: new Stroke({ color: "#000", width: 2 }),
    text: feature.get("callsign"),
    offsetY: -18,
    //rotateWithView: true,
    rotation: torottext,
  });
  lineStyle0.setText(text1);
  /* *etsttestetstetstetst* */

  styles.push(lineStyle0);

  return styles;
};
