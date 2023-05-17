"use strict";

// opendata_id,
//   -latitude,
//   -longitude,
//   -ihk_branch_id,
//   -employees_range,
//   -business_age,
//   business_type,

module.exports = { parseDataForBackend };
const fs = require("fs");
const Papa = require("papaparse");

const areNumbers = [
  "postcode",
  "latitude",
  "longitude",
  "ihk_branch_id",
  "nace_id",
  "branch_top_level_id",
  "planungsraum_id",
  "business_age",
];

function parseDataForBackend(mainCallback) {
  const outputStream = fs.createWriteStream("../app/public/dataBackend.json");
  const outputStreamIndexed = fs.createWriteStream(
    "../app/public/dataBackendIndexed.json"
  );
  // Write the initial object structure
  outputStream.write(`[`);
  outputStreamIndexed.write(`{`);
  let data = Papa.parse(
    fs.readFileSync(
      path.join(__dirname, "data/IHKBerlin_Gewerbedaten.csv"),
      "utf-8"
    )
  );
  const headers = data.data[0];
  data.data.splice(0, 1);

  async.forEachOf(data.data, function (d, i, callbackEach) {
    let lat = false,
      lng = false,
      opendata_id = false,
      ihk_branch_id = false,
      employees_range = false,
      business_age = false,
      business_type = false;
    async.forEachOf(d, function (dd, ii, cb) {
      const name = headers[ii];
      if (dd.charAt(0) === "'" && dd.charAt(dd.length - 1) === "'") {
        dd = dd.slice(1, -1);
      }
      if (dd.length === 0) {
        dd = null;
      }
      if (dd === "NULL") {
        dd = null;
      }
      if (dd === "000000") {
        dd = null;
      }
      if (areNumbers.includes(name)) {
        if (Number(dd)) {
          dd = Number(dd);
        }
      }
      // 4 decimal places will give a precision up to ~10 m
      // 5 decimal places will give a precision up to ~1 m
      if (name === "latitude" && dd !== null) {
        lat = dd.toFixed(5);
      }
      if (name === "longitude" && dd !== null) {
        lng = dd.toFixed(5);
      }

      if (name === "opendata_id") {
        opendata_id = dd;
      }

      if (name === "ihk_branch_id") {
        ihk_branch_id = dd;
      }

      if (name === "employees_range") {
        employees_range = dd;
      }

      if (name === "business_age") {
        business_age = dd;
      }

      if (name === "business_type") {
        business_type = dd === "im Handelsregister eingetragen" ? 1 : 0;
      }

      cb();
    });

    if (lat && lng) {
      if (i !== 0) {
        outputStream.write(",");
        outputStreamIndexed.write(",");
      }
      outputStream.write(
        `{"id":${opendata_id},"b_id":${ihk_branch_id},"nr_e":"${employees_range}","age":${business_age},"type":${business_type}}`
      );
      outputStreamIndexed.write(
        `"${opendata_id}":{"id":${opendata_id},"b_id":${ihk_branch_id},"nr_e":"${employees_range}","age":${business_age},"type":${business_type}}`
      );
    }

    callbackEach();
  });
  outputStream.write("]");
  outputStream.end();
  outputStreamIndexed.write("}");
  outputStreamIndexed.end();
  // setTimeout(() => {
  mainCallback();
  // }, 2000);
}
