"use strict";

module.exports = { downloadData };

const axios = require("axios");
const fs = require("fs");
const path = require("path");

function downloadData(mainCallback) {
  console.log("downloading data");

  const downloadUrl =
    "https://media.githubusercontent.com/media/IHKBerlin/IHKBerlin_Gewerbedaten/master/data/IHKBerlin_Gewerbedaten.csv";
  const outputPath = path.join(__dirname, "/data/IHKBerlin_Gewerbedaten.csv");

  axios
    .get(downloadUrl, { responseType: "stream" })
    .then((response) => {
      const writeStream = fs.createWriteStream(outputPath);
      response.data.pipe(writeStream);

      return new Promise((resolve, reject) => {
        writeStream.on("finish", resolve);
        writeStream.on("error", reject);
      });
    })
    .then(() => {
      console.log(`CSV file downloaded and saved to ${outputPath}`);
      mainCallback();
    })
    .catch((error) => {
      console.error("Error while downloading CSV file:", error.message);
    });
}
