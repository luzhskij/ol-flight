import React, { useRef, useEffect, useState, useCallback } from "react";
import ReactDOM from "react-dom";
import { AdditionLayer, AdditionLayerToolsGeometry } from "@layers/addition";

import "ol/ol.css";
//import "ol-layerswitcher/dist/ol-layerswitcher.css";
import "@styles/app";
import "../../assets/styles/controls.scss";

import ol, { Feature } from "ol";
import Map from "ol/Map";
import View from "ol/View";
import LayerGroup from "ol/layer/Group";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import XYZ from "ol/source/XYZ";
import { transform } from "ol/proj";
import { Overlay } from "ol";

import { Coordinate, toStringXY, toStringHDMS, format } from "ol/coordinate";
import * as olCoordinate from "ol/coordinate";

import * as olInteraction from "ol/interaction";
import ScaleLine from "ol/control/ScaleLine";
import FullScreen from "ol/control/FullScreen";
import ZoomSlider from "ol/control/ZoomSlider";
import Zoom from "ol/control/Zoom";
import MousePosition from "ol/control/MousePosition";

//import LayerSwitcher from "ol-layerswitcher";
import { LayerSwitcherControl } from "./LayerSwitcherControl";

import {
  read_last_position,
  get_last_zoom,
  get_last_positions,
} from "../utility/localStorage";

import "ol-ext/control/ProgressBar.css";
import ProgressBar from "ol-ext/control/ProgressBar";

import { openSkyLayer } from "@layers/addition";

export let layerSetZIndexBase = {
  zero: 0,
  standard_w: 1,
  standard_l: 2,
  day_night: 5,
  test: 10,
  openaip: 51,
  rsa_l: 58,
  tracks_l: 59,
  airports_l: 60,
  aircrafts: 70,
  progress: 100,
};

import {
  AddTileLayers,
  localOsm,
  localBing,
  waterLayer,
  osmLayer,
  googlelayer,
} from "../layers/TileLayers";

import { AddInfoLayers } from "../layers/InfoLayer";

import { AddVectorLayers } from "../layers/VectorLayers";

const mousePositionControl = new MousePosition({
  coordinateFormat: function (coordinate) {
    let lon = coordinate![0];
    let lat = coordinate![1];
    lon = lon % 360;
    if (lon > 180) {
      lon -= 360;
    } else if (lon < -180) {
      lon += 360;
    }
    let modifiedCoordinate = [lon, lat];
    let crd1 = format(modifiedCoordinate, "{x}, {y}", 6);
    let crd2 = toStringHDMS(modifiedCoordinate, 1);
    return crd1 + " | " + crd2;
  },
  projection: "EPSG:4326",
  className: "custom-mouse-position",
  target: document.getElementById("mouse_position")!,
  //placeholder: false,
  placeholder: "", //-> так скрывается поле
});

export const AddControls = (map: Map) => {
  map.addControl(new Zoom());
  map.addControl(new ZoomSlider());
  map.addControl(new ScaleLine());
  map.addControl(new FullScreen());

  let progress = new ProgressBar({
    //label: 'Loading...',
    layers: [localOsm, localBing, waterLayer, osmLayer, googlelayer],
    zIndex: layerSetZIndexBase["progress"],
  });
  map.addControl(progress);
  map.addControl(mousePositionControl);
};

export let openskyLayerGroup;

//------------------------

export const App = (props: any) => {
  const [map, setMap] = useState<any>(null);
  const [tooltip, setTooltip] = useState<any>({
    visible: false,
    coord: [0, 0],
    params: {
      id: -1,
    },
  });
  const [selectedCoord, setSelectedCoord] = useState<Coordinate>([
    0, 0,
  ] as Coordinate);
  const [additionLayer, setAdditionLayer] = useState<any>(null);

  const mapElement = useRef<any>(null);
  const tooltipElement = useRef<any>(null);

  const displayTooltip = (event) => {
    //const clickedCoord = map.getCoordinateFromPixel( event.pixel );
    //const transormedCoord = transform( clickedCoord, "EPSG:3857", "EPSG:4326" );
    //setSelectedCoord( transormedCoord );

    let pixel = event.pixel;
    let same = false;
    let t: any[] = [];
    let feature = map.forEachFeatureAtPixel(pixel, (g) => {
      if (tooltip.feature && g.getId() == tooltip.feature.getId()) same = true;

      t.push(g.getId());

      return g;
    });

    if (feature && !feature.get("tool")) feature = null;

    if (!feature) {
      if (!tooltip.feature) return;

      feature = tooltip.feature;

      const key = feature.get("key");
      const source = feature.get("source");
      const data: any = source.__featuresData[key];

      if (data.dragging) return;

      data.expanded = false;
      feature.setGeometry(AdditionLayerToolsGeometry(data, map));

      setTooltip({
        visible: false,
        feature: null,
        coord: [0, 0],
        params: { id: -1 },
      });

      return;
    }

    //console.log( same, t, tooltip.feature ? tooltip.feature.getId() : -1  );

    if (tooltip.feature && same) return;

    //if( (feature.getId() == tooltip.params.id) )
    //	return;

    let params = feature
      ? {
          id: feature.getId(),
          name: feature.get("name"),
          rotation: feature.get("rotation"),
          longitude: feature.get("longitude"),
          latitude: feature.get("latitude"),
          velocity: feature.get("velocity"),
        }
      : tooltip.params;

    const key = feature.get("key");
    const source = feature.get("source");
    const data: any = source.__featuresData[key];
    data.expanded = true;
    data.zIndex = (data.zIndex || 0) + 1;
    console.log(data.zIndex);
    feature.setGeometry(AdditionLayerToolsGeometry(data, map));

    setTooltip({
      visible: !!feature,
      feature: feature,
      coord: [pixel[0], pixel[1]],
      params: params,
    });
  };

  const get_current_zoom = () => {
    if (!map) {
      return -1;
    }
    return map.getView().getZoom();
  };

  let currZoom = get_current_zoom();

  const saveLocalPos = (map: Map) => {
    if (!map) {
      return;
    }

    let newZoom = map.getView().getZoom();
    console.info("zoom: " + newZoom);

    if (currZoom != newZoom) {
      currZoom = newZoom;
      localStorage.setItem("zoom", String(newZoom));
    }
    let ccentr = map.getView().getCenter();
    let x = ccentr![0];
    let y = ccentr![1];
    let xy: string = x + "," + y;
    localStorage.setItem("center", xy);
  };

  //-----

  useEffect(() => {
    const initialMap = new Map({
      target: mapElement.current || undefined,
      layers: [],
      view: new View({
        projection: "EPSG:3857",
        maxZoom: 19,
        constrainResolution: true,
      }),
      interactions: olInteraction
        .defaults()
        .extend([new olInteraction.PinchZoom()]),
    });

    // Setups
    initialMap.getView().setZoom(get_last_zoom());

    let lastPos = get_last_positions();
    if (!lastPos) {
      initialMap
        .getView()
        .setCenter(transform([37.6, 55.77], "EPSG:4326", "EPSG:3857"));
    } else {
      initialMap.getView().setCenter(lastPos);
    }

    initialMap.on("moveend", function (e) {
      saveLocalPos(initialMap);
    });

    AddControls(initialMap);

    AddVectorLayers(initialMap);

    AddInfoLayers(initialMap);

    AdditionLayer(initialMap);

    openskyLayerGroup = new LayerGroup({
      // A layer must have a title to appear in the layerswitcher
      title: "OpenSky",
      layers: [openSkyLayer],
      fold: "close",
      visible: false,
      openInLayerSwitcher: false,
      displayInLayerSwitcher: true,
    } as any);

    initialMap.addLayer(openskyLayerGroup);

    AddTileLayers(initialMap);
    //AddVectorLayers(initialMap);

    LayerSwitcherControl(initialMap);

    setMap(initialMap);
    //setAdditionLayer(layers[1]);
    setAdditionLayer(openSkyLayer);
  }, []);

  //#Events
  useEffect(() => {
    if (!map) return;

    map.on("pointermove", displayTooltip);

    return () => {
      map.un("pointermove", displayTooltip);
    };
  }, [map, tooltip]);

  //^

  //#Auto refresh
  useEffect(() => {
    if (!additionLayer) return;

    let interval = setInterval(() => {
      additionLayer.refreshLayers();
    }, 5500);

    return () => {
      clearInterval(interval);
    };
  }, [additionLayer]);
  //^
  //#Tooltip Auto-follow
  useEffect(() => {
    let interval = setInterval(() => {
      const feature: Feature | null = tooltip.feature;

      if (!feature) return;

      let params = feature
        ? {
            id: feature.getId(),
            name: feature.get("name"),
            rotation: feature.get("rotation"),
            longitude: feature.get("longitude"),
            latitude: feature.get("latitude"),
            velocity: feature.get("velocity"),
          }
        : tooltip.params;

      const key = feature.get("key");
      const source = feature.get("source");
      const data: any = source.__featuresData[key];

      var coordinate = data.center;
      var pixel = map.getPixelFromCoordinate(coordinate);

      setTooltip({
        visible: !!feature,
        feature: feature,
        coord: [pixel[0], pixel[1]],
        params: params,
      });
    }, 4);

    return () => {
      clearInterval(interval);
    };
  }, [tooltip.feature]);
  //^

  //console.log( tooltip.coord, tooltip.visible );

  return (
    <div className="app">
      <div
        ref={tooltipElement}
        className="map-tooltip"
        style={{
          display: tooltip.visible ? "block" : "none",
          left: tooltip.coord[0] + "px",
          top: tooltip.coord[1] + "px",
        }}
      >
        <div>
          <p>name: </p>
          <p>{tooltip.params.name}</p>
        </div>
        <div>
          <p>longitude: </p>
          <p>{tooltip.params.longitude}</p>
        </div>
        <div>
          <p>latitude: </p>
          <p>{tooltip.params.latitude}</p>
        </div>
        <div>
          <p>velocity: </p>
          <p>{tooltip.params.velocity}</p>
        </div>
        <div>
          <button onClick={() => console.log(555)}>{"Expand"}</button>
        </div>
      </div>
      <div ref={mapElement} className="map"></div>
      <div className="map-coord">
        {selectedCoord ? toStringXY(selectedCoord, 5) : ""}
      </div>
    </div>
  );
};
