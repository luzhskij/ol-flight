/**
 *  OSM layer using the php script
 *  @constructor ol.source.PhpPostgis
 *  @extends {ol.source.Vector}
 *  @param {any} options
 *  @param {string} options.url service url, default: http://192.168.1.194:60/postgis_geojson.php?
 *  @param {Array<string>} options.filter an array of tag filters, ie. ["key", "key=value", "key~value", ...]
 *  @param {boolean} options.node get nodes, default: true
 *  @param {boolean} options.way get ways, default: true
 *  @param {boolean} options.rel get relations, default: false
 *  @param {number} options.maxResolution maximum resolution to load features
 *  @param {string|ol.Attribution|Array<string>} options.attributions source attribution, default OSM attribution
 *  @param {ol.loadingstrategy} options.strategy loading strategy, default ol.loadingstrategy.bbox
 */

import ol_ext_inherits from "ol-ext/util/ext";
import { bbox as ol_loadingstrategy_bbox } from "ol/loadingstrategy";
import ol_source_Vector from "ol/source/Vector";
import { transformExtent as ol_proj_transformExtent } from "ol/proj";

//import * as ol_format from 'ol/format';
import GeoJSON from "ol/format/GeoJSON";

import { checkCoordinates } from "./hutils";

var ol_source_PhpPostgis = function (options) {
  options = options || {};
  options.loader = this._loaderFn;

  /** php script default Url */
  this._url = options.url || "/sql/postgis_geojson.php?";
  /** Max resolution to load features  */
  this._maxResolution = options.maxResolution || 30000;
  /** Default attribution */
  if (!options.attributions) {
    options.attributions = "Manual Vector";
  }
  // Bbox strategy : reload at each move
  if (!options.strategy) {
    options.strategy = ol_loadingstrategy_bbox;
  }
  ol_source_Vector.call(this, options);
  this._types = {
    node: options.node !== false,
    way: options.way !== false,
    rel: options.rel === true,
  };
  this._filter = options.filter;
  //_____________________________
  // options = options || {};
  // options.loader = this._loaderFn;

  // /** php script default Url */
  // this._url = options.url || "/sql/postgis_geojson.php?";
  // /** Max resolution to load features  */
  // this._maxResolution = options.maxResolution || 30000;
  // /** Default attribution */
  // if (!options.attributions) {
  //   options.attributions = "Manual Vector";
  // }
  // // Bbox strategy : reload at each move
  // if (!options.strategy) {
  //   options.strategy = ol_loadingstrategy_bbox;
  // }
  // ol_source_Vector.call(this, options);
  // this._types = {
  //   node: options.node !== false,
  //   way: options.way !== false,
  //   rel: options.rel === true,
  // };
  // this._filter = options.filter;
};

ol_ext_inherits(ol_source_PhpPostgis, ol_source_Vector);
/** Loader function used to load features.
 * @private
 */

ol_source_PhpPostgis.prototype._loaderFn = function (
  extent,
  resolution,
  projection
) {
  if (resolution > this._maxResolution) return;
  var self = this;

  var bbox = ol_proj_transformExtent(extent, projection, "EPSG:4326");

  let lon_min = checkCoordinates(bbox[0], 0);
  let lon_max = checkCoordinates(bbox[2], 0);
  bbox[0] = lon_min;
  bbox[2] = lon_max;

  if (lon_min > lon_max) {
    bbox[2] = lon_min;
    bbox[0] = lon_max;
  }

  var typefilter = "";
  for (var n = 0, filter; (filter = self._filter[n]); n++) {
    typefilter += "&";
    typefilter += filter;
  }
  //console.log(typefilter);

  var query2 = self._url;

  var now = Date.now();
  query2 = query2 + "t=" + now;

  query2 += "&bbox=";
  query2 += bbox.join(",");
  //query2 += "&type=";
  query2 += typefilter;

  console.log(query2);

  //---------------------------------------

  fetch(query2)
    .then((response) => response.json())
    .then((response) => {
      if (!response) {
        return;
      }

      var features = new GeoJSON().readFeatures(response, {
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

      var result = [];
      /*
      // Remove duplicated features
      for (var i = 0, f; (f = features[i]); i++) {
        if (!self.hasFeature(f)) {
          result.push(f);
        }
      }

      self.addFeatures(result);
      */

      /*
    if (!response.states)
      return;

    if (response.time < params.time)
      return;

    params.time = response.time;

    let features = response.states.map((item) => {

      let feature = source.getFeatureById(item[0]);
      const initialCoord = transform([item[5], item[6]], 'EPSG:4326', 'EPSG:3857');

      if (!feature)
        feature = new Feature({
          geometry: new OLGeometry.Point(initialCoord),
        });
      feature.setId(item[0]);
      feature.set("name", item[1] || "");
      feature.set("rotation", VMath.radians(item[10] || 0));
      feature.set("longitude", (item[5] || 0));
      feature.set("latitude", (item[6] || 0));
      feature.set("velocity", (item[9] || 0));
      feature.setStyle(AdditionLayerStyle(feature));
      feature.getGeometry().setCoordinates(initialCoord);
      return feature;
    });
    let toolsFeatures = response.states.map((item) => {
      const initialCoord = transform([item[5], item[6]], 'EPSG:4326', 'EPSG:3857');
      const key = (item[0] + ":tools") || "";
      let data: any = source.__featuresData[key];

      if (!data)
        data = source.__featuresData[key] = {
          angle: VMath.radians(45.0),
          distance: 14000
        };

      data.initial = initialCoord;

      let feature: any = source.getFeatureById(key);

      if (feature)
        feature.setGeometry(AdditionLayerToolsGeometry(data, map));
      else
        feature = new Feature({
          geometry: AdditionLayerToolsGeometry(data, map),
        });


      feature.setId(key);
      feature.set("tool", true);
      feature.set("key", key);
      feature.set("source", source);
      feature.set("map", map);
      feature.set("n", item[0] || "");
      feature.set("name", item[1] || "");
      feature.set("longitude", (item[5] || 0));
      feature.set("latitude", (item[6] || 0));
      feature.set("velocity", (item[9] || 0));
      feature.setStyle(AdditionLayerToolsStyle);
      return feature;
    });

    let length = 0;

    source.forEachFeature((feature) => {
      length++;
      //source.removeFeature( feature );
    });


    source.addFeatures(features);
    source.addFeatures(toolsFeatures);
    //console.log( length );
    */
    })
    .catch(() => {});

  //---------------------------------------

  /*
  document.getElementById("laodingcont").innerHTML =
    "<font color='orange'>start loading.....</font>";

  $.ajax({
    type: "GET",
    dataType: "json",
    url: query2,
    context: this,
  })
    .done(function (data) {
      var features = new GeoJSON().readFeatures(data, {
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

      var result = [];

      // Remove duplicated features
      for (var i = 0, f; (f = features[i]); i++) {
        if (!self.hasFeature(f)) {
          result.push(f);
        }
      }

      self.addFeatures(result);

      document.getElementById("laodingcont").innerHTML =
        "<font color='green'>finish loading vector layer.</font>";

      setTimeout(function () {
        $("#laodingcont").empty();
      }, 2000);
    })
    .fail(function () {
      //FAIL LOADING
      //place here any actions on fail loading layer
      document.getElementById("laodingcont").innerHTML =
        "<font color='red'>error loading vector layer.</font>";
    });
*/
};
/**
 * Search if feature is allready loaded
 * @param {ol.Feature} feature
 * @return {boolean}
 * @private
 */
ol_source_PhpPostgis.prototype.hasFeature = function (feature) {
  var p = feature.getGeometry().getFirstCoordinate();
  var id = feature.getId();
  var existing = this.getFeaturesInExtent([
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

export default ol_source_PhpPostgis;
