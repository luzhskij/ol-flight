import $ from "jquery";

import { toWgs84 } from "@turf/turf";
import { polygon, lineString } from "@turf/turf";

import arc from "arc";
//var arc = require("arc");

import { transformExtent as ol_proj_transformExtent } from "ol/proj";

import Map from "ol/Map";

import MultiLineString from "ol/geom/MultiLineString";
import * as olExtent from "ol/extent";
import Units, { METERS_PER_UNIT } from "ol/proj/Units";
import { transform } from "ol/proj";
import Point from "ol/geom/Point";

/**
 * geometry operations
 * @returns
 */
function transformExtTo4326(extent) {
  return ol_proj_transformExtent(extent, "EPSG:3857", "EPSG:4326");
}

function transformExtTo3857(extent) {
  return ol_proj_transformExtent(extent, "EPSG:4326", "EPSG:3857");
}

//----------------------------------------------------------------------------------
//-------------turf convert---------
function convertToTurfFeature(feature) {
  var featureGeometry = feature.getGeometry();
  return convertToTurfGeometry(featureGeometry);
}

export function convertToTurfGeometry(ol_geometry) {
  var geometryType = ol_geometry.getType();
  var featureCoords = geometryType.startsWith("Multi")
    ? ol_geometry.getCoordinates()[0][0]
    : ol_geometry.getCoordinates()[0];

  //var turfFeature = turf.polygon([featureCoords]);
  var turfFeature = toWgs84(polygon([featureCoords]));
  return turfFeature;
}

function convertToTurfFeatureLine(feature) {
  var featureGeometry = feature.getGeometry();
  return convertToTurfGeometryLine(featureGeometry);
}

function convertToTurfGeometryLine(ol_geometry) {
  var geometryType = ol_geometry.getType();
  var featureCoords = geometryType.startsWith("Multi")
    ? ol_geometry.getCoordinates()[0][0]
    : ol_geometry.getCoordinates();

  var turfFeature = toWgs84(lineString(featureCoords));
  return turfFeature;
}

export const getBounds = (map: Map) => {
  const extent = map.getView().calculateExtent(map.getSize());
  return transformExtTo4326(extent);
};
//-------------turf convert---------

//--------track problem crosses 180-----------
export function toMultiArcs(feature) {
  let ggm = feature.getGeometry();
  ggm.transform("EPSG:3857", "EPSG:4326");

  let compl: any[] = [];

  let zx = ggm.getCoordinates();
  for (let r = 0; r < zx.length - 1; ++r) {
    let start = { x: zx[r][0], y: zx[r][1] };
    let end = { x: zx[r + 1][0], y: zx[r + 1][1] };
    let generator = new arc.GreatCircle(start, end, { name: "_g" });
    let line = generator.Arc(2, { offset: 100 });

    for (let v = 0; v < line.geometries.length; v++) {
      compl.push(line.geometries[v].coords);
    }
  }

  let newGeomsZ = new MultiLineString(compl);
  newGeomsZ.transform("EPSG:4326", "EPSG:3857");
  feature.setGeometry(newGeomsZ);

  return;
}
//--------track problem crosses 180-----------
//----------------------------------------------------------------------------------
export function degrees_to_radians(degrees) {
  let pi = Math.PI;
  return degrees * (pi / 180);
}

//--------------------other-------------------

export function checkCoordinates(c, w) {
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

// wrapper for $.getJSON, but includes credentials (for cross origin setups) - should be usable by all parts of the site
export function getJSON(url, func, errfunc) {
  $.ajax({
    url: url,
    type: "GET",
    dataType: "json",
    xhrFields: { withCredentials: true },
    success: func,
    error: errfunc,
  });
}
export function timeout(ms, promise) {
  var timerPromise = new Promise(function (resolve, reject) {
    var start = new Date();
    if (ms < 0) {
      /*console.log("graceful timeout ignore");*/
      return;
    }
    setTimeout(function () {
      var now = new Date();
      reject(new Error("Request Timeout after " + ms + "ms"));
    }, ms);
  });
  return Promise.race([timerPromise, promise]);
}

export function dumpError(err) {
  if (typeof err === "object") {
    if (err.message) {
      console.log("\nMessage: " + err.message);
    }
    if (err.stack) {
      console.log("\nStacktrace:");
      console.log("====================");
      console.log(err.stack);
    }
  } else {
    console.log("dumpError :: argument is not an object");
  }
}

export function getTimeString(isLocal) {
  var hours;
  var minutes;
  var date = new Date();
  var zone_offset = date.getTimezoneOffset();

  if (isLocal) {
    hours = date.getHours();
    minutes = date.getMinutes();
  } else {
    hours = date.getUTCHours();
    minutes = date.getUTCMinutes();
  }

  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  var zeit_string = hours + ":" + minutes;

  return zeit_string;
}

/*
export const ol_getviewportExtent = (map: Map) => {
  var viewport = {
    swlat: 0,
    swlon: 0,
    nelat: 0,
    nelon: 0,
    latcntr: 0,
    loncntr: 0,
  };

  var wrapLon = function (value) {
    var worlds = Math.floor((value + 180) / 360);
    return value - worlds * 360;
  };

  var extent = map.getView().calculateExtent(map.getSize());
  var bottomLeft = olExtent.getBottomLeft(extent);
  var topRight = olExtent.getTopRight(extent);

   //Extend viewport to include incoming and outgoing aircrafts (to prevent "corner-hangers"
   //                The Pixels might not be available yet (map is not yet loaded asynchronously,
   //                so this extent expansion is optional.
                     
  var paddingPixels = 60; // 60 pixels

  // unit = Meter for EPSG 3857
  var curresol = map.getView().getResolution();
  if (curresol == undefined) {
    curresol = 1;
  }
  var pixelPerUnit = 1 / curresol;
  var paddingUnits = paddingPixels / pixelPerUnit;
  var paddingDegrees = paddingUnits / METERS_PER_UNIT.degrees;

  // transform to WGS84
  bottomLeft = transform(bottomLeft, "EPSG:3857", "EPSG:4326");
  topRight = transform(topRight, "EPSG:3857", "EPSG:4326");

  bottomLeft[0] -= paddingDegrees;
  bottomLeft[1] -= paddingDegrees;
  topRight[0] += paddingDegrees;
  topRight[1] += paddingDegrees;

  viewport.swlat = bottomLeft[1];
  viewport.swlon = wrapLon(bottomLeft[0]);

  viewport.nelat = topRight[1];
  viewport.nelon = wrapLon(topRight[0]);

  var point = new Point(map.getView().getCenter()); // get center
  point.transform("EPSG:900913", "EPSG:4326"); // transform center to wgs84
  viewport.latcntr = point.getCoordinates()[1];
  viewport.loncntr = point.getCoordinates()[0];

  return {
    vpn: viewport.nelat,
    vpe: viewport.nelon,
    vps: viewport.swlat,
    vpw: viewport.swlon,
    vplat: viewport.latcntr,
    vplon: viewport.loncntr,
  };
};
*/
