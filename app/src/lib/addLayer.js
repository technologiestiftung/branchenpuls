// [ 86, 189, 102 ]
// [ 0, 51, 102 ]
import { ScatterplotLayer } from "@deck.gl/layers";
function generateUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// a function that generates a random gba color
function generateRandomColor() {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = 102;
  return [r, g, b];
}

export function addLayer(layersData, setLayersData) {
  //   console.log("ÄÄÄÄ", layersData.keys(layersData).length);
  const newLayer = {};
  newLayer.id = generateUUID();
  newLayer.color = generateRandomColor();
  layersData[newLayer.id] = newLayer;
  setLayersData(layersData);
}
