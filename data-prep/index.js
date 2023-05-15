async = require("async");
path = require("path");
dirName = __dirname;

const { downloadData } = require("./downloadData");
const { parseData } = require("./parseData");

// run these functions in order
async.waterfall(
  [
    // downloadData,
    parseData,
  ],
  function (err, result) {
    console.log("aaaaall done");
  }
);
