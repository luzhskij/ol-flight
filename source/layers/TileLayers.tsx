import "ol/ol.css";

import Map from "ol/Map";
import LayerGroup from "ol/layer/Group";
import TileLayer from "ol/layer/Tile";
import { OSM } from "ol/source";
import TileWMS from "ol/source/TileWMS";
import Stamen from "ol/source/Stamen";
import XYZ from "ol/source/XYZ";

import { layerSetZIndexBase } from "../modules/app";

export let localOsm,
  localBing,
  osmLayer,
  waterLayer,
  tonerlayer,
  terrainlayer,
  googlelayer;
export let baseLocalLayerGroup;
export let baseWebLayerGroup;

const CreateLocalTilesGroup = () => {
  localOsm = new TileLayer({
    // preload low zoom tiles
    preload: Infinity,
    title: "Local OSM",
    type: "base",
    baseLayer: true,
    visible: true,
    zIndex: layerSetZIndexBase["standard_l"],
    source: new XYZ({
      url: "/osm/{z}/{x}/{y}.png",
      // tilePixelRatio: 2,
      attributions:
        '© <a href="http://192.168.1.194/" target="_blank" rel="noreferrer">' +
        "Hello it`s local OSM</a>",
    }),
  } as any);

  localBing = new TileLayer({
    // preload low zoom tiles
    preload: Infinity,
    title: "Local Bing",
    type: "base",
    baseLayer: true,
    zIndex: layerSetZIndexBase["standard_l"],
    visible: false,
    source: new XYZ({
      url: "/bing/{z}/{x}/{y}.png",
      // tilePixelRatio: 2,
      attributions:
        '© <a href="http://192.168.1.194/" target="_blank" rel="noreferrer">' +
        "Hello it`s local Bing</a>",
    }),
  } as any);

  baseLocalLayerGroup = new LayerGroup({
    // A layer must have a title to appear in the layerswitcher
    title: "Local maps",
    fold: "open",
    openInLayerSwitcher: true,
    layers: [localBing, localOsm],
    visible: true,
  } as any);
};

const CreateWebTilesGroup = () => {
  osmLayer = new TileLayer({
    // preload low zoom tiles
    preload: Infinity,
    // A layer must have a title to appear in the layerswitcher
    title: "OSM",
    // Again set this layer as a base layer
    type: "base",
    baseLayer: true,
    visible: false,
    zIndex: layerSetZIndexBase["standard_w"],
    source: new OSM(),
  } as any);

  waterLayer = new TileLayer({
    // preload low zoom tiles
    preload: Infinity,
    // A layer must have a title to appear in the layerswitcher
    title: "Water color",
    // Again set this layer as a base layer
    type: "base",
    baseLayer: true,
    visible: false,
    zIndex: layerSetZIndexBase["standard_w"],
    source: new Stamen({
      layer: "watercolor",
    }),
  } as any);

  tonerlayer = new TileLayer({
    // preload low zoom tiles
    preload: Infinity,
    // A layer must have a title to appear in the layerswitcher
    title: "Toner",
    // Again set this layer as a base layer
    type: "base",
    baseLayer: true,
    visible: false,
    zIndex: layerSetZIndexBase["standard_w"],
    source: new Stamen({
      layer: "toner",
    }),
  } as any);

  terrainlayer = new TileLayer({
    // preload low zoom tiles
    preload: Infinity,
    // A layer must have a title to appear in the layerswitcher
    title: "Terrain",
    // Again set this layer as a base layer
    type: "base",
    baseLayer: true,
    visible: false,
    zIndex: layerSetZIndexBase["standard_w"],
    maxZoom: 15,
    source: new Stamen({
      layer: "terrain",
    }),
  } as any);

  googlelayer = new TileLayer({
    title: "Google Maps",
    type: "base",
    baseLayer: true,
    visible: false,
    zIndex: layerSetZIndexBase["standard_w"],
    source: new XYZ({
      url: "http://mt0.google.com/vt/lyrs=p&hl=en&x={x}&y={y}&z={z}",
    }),
  } as any);

  baseWebLayerGroup = new LayerGroup({
    // A layer must have a title to appear in the layerswitcher
    title: "Web maps",
    layers: [waterLayer, tonerlayer, terrainlayer, osmLayer, googlelayer],
    fold: "close",
    visible: false,
    openInLayerSwitcher: false,
    displayInLayerSwitcher: true,
  } as any);
};

/* OpenAip */

export let openaip_overlays;

export function create_openaip_layer() {
  openaip_overlays = new LayerGroup({
    title: "OpenAIP",
    combine: false,
    visible: false,
    zIndex: layerSetZIndexBase["openaip"],
    layers: [
      new TileLayer({
        title: "Navaids (on higher zoom levels)",
        type: "tiles",
        visible: false,
        opacity: 0.7,
        zIndex: layerSetZIndexBase["openaip"] + 5,
        source: new TileWMS({
          attributions:
            'AIP features kindly provided by <a target="_blank" href="http://www.openaip.net/" target="_blank">http://www.openaip.net/</a>',
          //attributions: new ol.control.Attribution({
          //    html: 'AIP features kindly provided by <a target="_blank" href="http://www.openaip.net/" target="_blank">http://www.openaip.net/</a>'
          //}),
          url: "http://{1-4}.tile.maps.openaip.net/geowebcache/service/wms",
          params: {
            LAYERS: "openaip_approved_navaids",
            TRANSPARENT: true,
            TILED: true,
            SRS: "EPSG:900913",
          },
        } as any),
      } as any),
      new LayerGroup({
        title: "Airspace Geometries & Labels",
        type: "tiles",
        visible: false,
        combine: true,
        zIndex: layerSetZIndexBase["openaip"] + 2,
        layers: [
          new TileLayer({
            title: "Airspace Geometries",
            opacity: 0.5,
            type: "tiles",
            visible: false,
            zIndex: layerSetZIndexBase["openaip"] + 3,
            source: new TileWMS({
              attributions:
                'AIP features kindly provided by <a target="_blank" href="http://www.openaip.net/" target="_blank">http://www.openaip.net/</a>',
              url: "http://{1-4}.tile.maps.openaip.net/geowebcache/service/wms",
              params: {
                LAYERS: "openaip_approved_airspaces_geometries",
                TRANSPARENT: true,
                TILED: true,
                SRS: "EPSG:900913",
              },
            } as any),
          } as any),
          new TileLayer({
            title: "Airspace Labels",
            type: "tiles",
            visible: false,
            opacity: 1.0,
            zIndex: layerSetZIndexBase["openaip"] + 4,
            source: new TileWMS({
              attributions:
                'AIP features kindly provided by <a target="_blank" href="http://www.openaip.net/" target="_blank">http://www.openaip.net/</a>',
              url: "http://{1-4}.tile.maps.openaip.net/geowebcache/service/wms",
              params: {
                LAYERS: "openaip_approved_airspaces_labels",
                TRANSPARENT: true,
                TILED: true,
                SRS: "EPSG:900913",
              },
            }),
          } as any),
        ],
      } as any),

      new TileLayer({
        title: "Airports",
        type: "tiles",
        visible: false,
        opacity: 1.0,
        zIndex: layerSetZIndexBase["openaip"] + 1,
        source: new TileWMS({
          attributions:
            'AIP features kindly provided by <a target="_blank" href="http://www.openaip.net/" target="_blank">http://www.openaip.net/</a>',
          url: "http://{1-4}.tile.maps.openaip.net/geowebcache/service/wms",
          params: {
            LAYERS: "openaip_approved_airports",
            TRANSPARENT: true,
            TILED: true,
            SRS: "EPSG:900913",
          },
        } as any),
      } as any),
      //end tilesource
    ],
  } as any);
}
/* OpenAip */

export const AddTileLayers = (map: Map) => {
  CreateLocalTilesGroup();
  CreateWebTilesGroup();
  create_openaip_layer();

  map.addLayer(openaip_overlays);
  map.addLayer(baseWebLayerGroup);
  map.addLayer(baseLocalLayerGroup);
};
