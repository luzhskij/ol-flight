import Map from "ol/Map";
import LayerGroup from "ol/layer/Group";
import VectorLayer from "ol/layer/Vector";
import Style from "ol/style/Style";
import CircleStyle from "ol/style/Circle";
import Fill from "ol/style/Fill";
import { Collection } from "ol";

import DayNight from "ol-ext/source/DayNight";

import { layerSetZIndexBase } from "../modules/app";

/* Additional */
export let overlayAdditionalLayerGroup;
export let exampleDNlayer;

export function create_additional_layers() {
  overlayAdditionalLayerGroup = new LayerGroup({
    title: "Additional layers",
    layers: [],
    visible: false,    
    openInLayerSwitcher: false,
    displayInLayerSwitcher: true,
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

  overlayAdditionalLayerGroup.setLayers(new Collection([exampleDNlayer]));
}
/* Additional */

export const AddInfoLayers = (map: Map) => {
  create_additional_layers();

  map.addLayer(overlayAdditionalLayerGroup);
};
