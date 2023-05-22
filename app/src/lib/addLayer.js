// [ 86, 189, 102 ]
// [ 0, 51, 102 ]
import { ScatterplotLayer } from "@deck.gl/layers";
import chroma from "chroma-js";

function generateUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// a function that generates a random gba color
function generateRandomColor(index) {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = 102;
  return [r, g, b];
  //   const fixed = ["#cc0000", "#00cccc", "#cc006b", "#00cc66"];
  //   let rgbColors = fixed.map((c) => chroma(c).rgb());
  //   return rgbColors[index];
}

function generateHeatmapColor(pointColor) {
  const color = JSON.parse(JSON.stringify(pointColor));
  let colors = chroma
    .scale([[255, 255, 255], color])
    .mode("lch")
    .colors(6);
  let rgbColors = colors.map((c) => chroma(c).rgb());
  return rgbColors;
}

export function addLayer(layersData, setLayersData) {
  //   console.log("ÄÄÄÄ", layersData.keys(layersData).length);
  const newLayer = {};
  newLayer.id = generateUUID();
  newLayer.color = generateRandomColor();
  newLayer.heatmapColor = generateHeatmapColor(newLayer.color);
  layersData = JSON.parse(JSON.stringify(layersData));
  layersData[newLayer.id] = newLayer;
  setLayersData(layersData);
}
