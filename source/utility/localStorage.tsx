import { Coordinate } from "ol/coordinate";

export function read_last_position() {
  let localCenter = localStorage.getItem("center");
  let localZoom = localStorage.getItem("zoom");
  if (localCenter == "NaN,NaN") {
    localCenter = "";
  }
  if (localCenter && localZoom) {
    let lcarrz = localCenter.split(",");
    let xx: number = +lcarrz[0];
    let yy: number = +lcarrz[1];
    let lcarr: Coordinate = [xx, yy];
    //let lcarr :Coordinate = localCenter.split(",");
    return [localZoom, lcarr];
  } else {
    return [];
  }
}

export const get_last_zoom = () => {
  let localZoom = localStorage.getItem("zoom");
  if (localZoom) {
    return +localZoom;
  } else {
    return 10;
  }
};

export const get_last_positions = () => {
  let localCenter = localStorage.getItem("center");
  if (localCenter == "NaN,NaN" || !localCenter) {
    return null;
  } else {
    let lcarrz = localCenter.split(",");
    let xx: number = +lcarrz[0];
    let yy: number = +lcarrz[1];
    let lcarr: Coordinate = [xx, yy];
    return lcarr;
  }
};
