async = require("async");
path = require("path");
dirName = __dirname;

const { downloadData } = require("./downloadData");
const { parseDataForBackend } = require("./parseDataForBackend");
const { parseDataForMap } = require("./parseDataForMap");

// run these functions in order
async.waterfall(
  [
    // downloadData,
    parseDataForBackend,
    parseDataForMap,
  ],
  function (err, result) {
    console.log("aaaaall done");
  }
);
