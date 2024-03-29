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

function getNewColor(layersData) {
	let newColor = "#cc0000";
	const defaults = ["#00727c", "#2e92d0", "#e40032"];
	const existingColors = [];
	Object.keys(layersData).forEach((key, i) => {
		existingColors.push(layersData[key].colorHex);
	});
	defaults.forEach((c) => {
		// console.log(c, defaults, newColor.includes(c));
		if (!existingColors.includes(c)) {
			newColor = c;
		}
	});
	return chroma(newColor).rgb();
}

function generateHeatmapColor(pointColor) {
	const color = JSON.parse(JSON.stringify(pointColor));
	let colors = chroma
		.scale([chroma(color).brighten(3), color, chroma(color).darken(2)])
		.mode("lch")
		.colors(6);
	let rgbColors = colors.map((c) => chroma(c).rgb());
	return rgbColors;
}

export function getNewLayerData(layersData) {
	const newLayer = {};
	newLayer.id = generateUUID();
	newLayer.color = getNewColor(layersData);
	newLayer.colorHex = chroma(JSON.parse(JSON.stringify(newLayer.color))).hex();
	newLayer.heatmapColor = generateHeatmapColor(newLayer.color);
	newLayer.heatmap = false;
	return newLayer;
}
