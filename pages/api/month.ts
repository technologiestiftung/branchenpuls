import type { NextApiRequest, NextApiResponse } from "next";
import db from "@lib/db";
const zlib = require("zlib");

function executeQuery(query: string): Promise<any> {
  return new Promise((resolve, reject) => {
    db.any(query)
      .then((data: QueryResult<any>) => {
        resolve(data);
      })
      .catch((error: Error) => {
        reject(error);
      });
  });
}

// Usage in your handler function
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { date } = req.query;

  console.log("date", date);

  const query = `
    SELECT
      CAST(s.opendata_id AS FLOAT) AS id,
      ARRAY[
          CAST(s.longitude AS FLOAT),
          CAST(s.latitude AS FLOAT)
      ] AS p
    FROM
      state_0${date}_2023 AS s
  `;

  try {
    const rows = await executeQuery(query);
    const strData = JSON.stringify(rows);
    zlib.gzip(strData, (err, buffer) => {
      if (!err) {
        res.setHeader("Content-Encoding", "gzip");
        res.setHeader("Content-Type", "application/json");
        res.send(buffer);
      } else {
        console.log(err);
        res.status(500).send("Error compressing data");
      }
    });
  } catch (error) {
    console.error("Error executing query", error);
    res
      .status(500)
      .json({ error: "An error occurred while executing the query" });
  }
}
