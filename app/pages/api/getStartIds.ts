import type { NextApiRequest, NextApiResponse } from "next";
import db from "@lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("req.query", req.query);

  // let { employees, age, bl1, bl2, bl3, bt } = req.query;

  console.log("----getStartIds------");

  db.any(
    `
    SELECT
        CAST(b.opendata_id AS FLOAT) AS id,
        ARRAY[
            CAST(l.longitude AS FLOAT),
            CAST(l.latitude AS FLOAT)
        ] AS p
    FROM
    business AS b
    INNER JOIN location AS l ON b.opendata_id = l.opendata_id
    WHERE
        b.updated_on = '2023-06-01'
    `
  )
    .then((rows) => {
      res.status(200).json(rows);

      // pgp.end();
    })
    .catch((err) => {
      console.error("Error executing query", err.stack);
    });
}
