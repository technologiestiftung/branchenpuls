import type { NextApiRequest, NextApiResponse } from "next";
import db from "@lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // console.log("req.query", req.query);

  // let { employees, age, bl1, bl2, bl3, bt } = req.query;

  // WITH location_by_date AS (
  //   SELECT DISTINCT ON (opendata_id) *
  //   FROM location
  //   WHERE created_on <= '2023-06-01'
  //     ORDER BY opendata_id, created_on DESC
  //   )

  //   SELECT
  //     CAST(b.opendata_id AS FLOAT) AS id,
  //     ARRAY[
  //         CAST(l.longitude AS FLOAT),
  //         CAST(l.latitude AS FLOAT)
  //     ] AS p
  //   FROM
  //   business AS b
  //   INNER JOIN location_by_date AS l ON b.opendata_id = l.opendata_id
  //   WHERE
  //     b.updated_on = '2023-06-01'

  db.any(
    `
    SELECT
      CAST(s.opendata_id AS FLOAT) AS id,
      ARRAY[
          CAST(s.longitude AS FLOAT),
          CAST(s.latitude AS FLOAT)
      ] AS p
    FROM
    state_06_2023 AS s
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
