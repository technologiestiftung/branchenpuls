"use strict";
// opendata_id,city,postcode,latitude,longitude,ihk_branch_id,nace_id,branch_top_level_id,employees_range,ihk_branch_desc,nace_desc,branch_top_level_desc,business_age,business_type,Bezirk,planungsraum_id,Planungsraum,Bezirksregion,Prognoseraum,Ortsteil

// opendata_id,
//   -latitude,
//   -longitude,
//   -ihk_branch_id,
//   -employees_range,
//   -business_age,
//   -business_type,

module.exports = { parseDataForBackendAndMakeOptions };
const fs = require("fs");
const Papa = require("papaparse");

const uiKeys = {};
uiKeys.nr_e = {};
uiKeys.bl1 = {};
uiKeys.bl2 = {};
uiKeys.bl3 = {};

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

function parseDataForBackendAndMakeOptions(mainCallback) {
  const outputStream = fs.createWriteStream("../app/public/dataBackend.json");
  // const outputStreamIndexed = fs.createWriteStream(
  //   "../app/public/dataBackendIndexed.json"
  // );
  // Write the initial object structure
  outputStream.write(`[`);
  // outputStreamIndexed.write(`{`);
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
      employees_range = false,
      business_age = false,
      business_type = false,
      ihk_branch_id = false,
      ihk_branch_desc = false,
      branch_top_level_id = false,
      branch_top_level_desc = false,
      nace_desc = false,
      nace_id = false;

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

      if (name === "latitude" && dd !== null) {
        lat = dd.toFixed(5);
      }
      if (name === "longitude" && dd !== null) {
        lng = dd.toFixed(5);
      }

      if (name === "opendata_id") {
        opendata_id = dd;
      }

      if (name === "nace_id") {
        nace_id = dd;
      }

      if (name === "nace_desc") {
        nace_desc = dd;
      }
      if (name === "branch_top_level_id") {
        branch_top_level_id = dd;
      }
      if (name === "branch_top_level_desc") {
        branch_top_level_desc = dd;
      }
      if (name === "ihk_branch_id") {
        ihk_branch_id = dd;
      }

      if (name === "ihk_branch_desc") {
        ihk_branch_desc = dd;
      }
      if (name === "employees_range") {
        employees_range = dd;
        uiKeys.nr_e[dd] = dd;
      }

      if (name === "business_age") {
        business_age = dd;
      }

      if (name === "business_type") {
        business_type = dd === "im Handelsregister eingetragen" ? 1 : 0;
      }

      cb();
    });

    uiKeys.bl1[branch_top_level_id] = branch_top_level_desc;
    uiKeys.bl2[nace_id] = nace_desc;
    uiKeys.bl3[ihk_branch_id] = ihk_branch_desc;

    if (lat && lng) {
      if (i !== 0) {
        outputStream.write(",");
        // outputStreamIndexed.write(",");
      }
      outputStream.write(
        `{"id":${opendata_id},"b_id":${ihk_branch_id},"nr_e":"${employees_range}","age":${business_age},"type":${business_type}}`
      );
      // outputStreamIndexed.write(
      //   `"${opendata_id}":{"id":${opendata_id},"b_id":${ihk_branch_id},"nr_e":"${employees_range}","age":${business_age},"type":${business_type}}`
      // );
    }

    callbackEach();
  });
  outputStream.write("]");
  outputStream.end();

  fs.writeFile(
    `../app/src/lib/uiKeys.json`,
    JSON.stringify(uiKeys),
    function (err) {
      console.log("all done");
    }
  );

  // outputStreamIndexed.write("}");
  // outputStreamIndexed.end();
  // setTimeout(() => {
  mainCallback();
  // }, 2000);
}
