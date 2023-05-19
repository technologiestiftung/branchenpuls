async = require("async");
path = require("path");
dirName = __dirname;

const { downloadData } = require("./downloadData");
const {
  parseDataForBackendAndMakeOptions,
} = require("./parseDataForBackendAndMakeOptions");
const { parseDataForMap } = require("./parseDataForMap");

// run these functions in order
async.waterfall(
  [
    // downloadData,
    parseDataForBackendAndMakeOptions,
    // parseDataForMap,
  ],
  function (err, result) {
    console.log("aaaaall done");
  }
);
