import Map from "ol/Map";
import LayerGroup from "ol/layer/Group";

import "ol-ext/control/LayerSwitcher.css";
import LayerSwitcher from "ol-ext/control/LayerSwitcher";

export const LayerSwitcherControl = (map: Map) => {
  let layerSwitcherIni = new LayerSwitcher({
    tipLabel: "Legende", // Optional label for button
    groupSelectStyle: "group", // Can be 'children' [default], 'group' or 'none'
    collapseTipLabel: "Hide layer list", // Optional label for button
    activationMode: "click",
    drawDelay: 100,
    reordering: false,
    selection: false,
    mouseover: false,
    show_progress: false,
    collapsed: false,
  });
  map.addControl(layerSwitcherIni);

  // selected in tree
  layerSwitcherIni.on("drawlist", function (e) {
    /*  --test--
    if (e.layer instanceof LayerGroup) {
      e.li.className = e.layer.get("visible") ? "visible" : "hidden";
    }
    --test-- */

    // The current layer
    let layer = e.layer;
  });

  let goUp = false;

  const listenVisible = (layers, parent?) => {
    layers.forEach(function (layer) {
      if (layer.getLayers) {
        listenVisible(layer.getLayers(), layer);
      }
      layer.on("change:visible", function () {
        // Show/hide sublayer
        if (!goUp && layer.getLayers) {
          layer.getLayers().forEach(function (l) {
            if (!l.getProperties().baseLayer) {
              l.setVisible(layer.getVisible());
            }
          });
        }
        // Show uplayer
        goUp = true;
        if (parent && layer.getVisible()) parent.setVisible(true);
        goUp = false;
      });
    });
  };

  listenVisible(map.getLayers());
};
