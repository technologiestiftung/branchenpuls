"use strict";

module.exports = { parseData };
const fs = require("fs");
const Papa = require("papaparse");
// const JSONStream = require("JSONStream");

const areNumbers = [
  "postcode",
  "latitude",
  "longitude",
  "ihk_branch_id",
  "nace_id",
  "branch_top_level_id",
  "planungsraum_id",
];

function parseData(mainCallback) {
  const outputStream = fs.createWriteStream("../app/public/data.json");
  // Write the initial object structure
  outputStream.write(`[`);
  let data = Papa.parse(
    fs.readFileSync(
      path.join(__dirname, "data/IHKBerlin_Gewerbedaten.csv"),
      "utf-8"
    )
  );
  const headers = data.data[0];
  data.data.splice(0, 1);

  async.forEachOf(data.data, function (d, i, callbackEach) {
    const point = {};

    let lat = false,
      lng = false;
    async.forEachOf(d, function (dd, ii, cb) {
      const name = headers[ii];
      if (areNumbers.includes(name)) {
        if (Number(dd)) {
          dd = Number(dd);
        }
      } else {
      }

      // 4 decimal places will give a precision up to ~10 m
      // 5 decimal places will give a precision up to ~1 m
      if (name === "latitude" && dd !== "NULL") {
        lat = dd.toFixed(5);
      }
      if (name === "longitude" && dd !== "NULL") {
        lng = dd.toFixed(5);
      }
      if (!["latitude", "longitude"].includes(name)) {
        // point[name] = dd;
      }

      // console.log("A", point.geometry.coordinates);
      point.p = [lng, lat];

      cb();
    });

    if (lat && lng) {
      const featureJson = JSON.stringify(point);
      // If it's not the first feature, add a comma to separate the features
      if (i !== 0) {
        outputStream.write(",");
      }
      // Write the feature JSON string to the output file
      outputStream.write(featureJson);
    }

    callbackEach();
  });
  outputStream.write("]");
  outputStream.end();
  setTimeout(() => {
    mainCallback();
  }, 2000);
}
