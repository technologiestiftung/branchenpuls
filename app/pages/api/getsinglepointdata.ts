import type { NextApiRequest, NextApiResponse } from "next";
import db from "@lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { pointid, lat, lng } = req.query;

  console.log("pointCoo", lat, lng);

  db.any(
    `
    SELECT
        *
    FROM
    business AS b
    INNER JOIN location AS l ON b.opendata_id = l.opendata_id
    WHERE
        l.latitude = ${lat} AND l.longitude = ${lng} AND b.updated_on = '2023-06-01'
    `
  )
    .then((rows) => {
      res.status(200).json({ data: rows });
    })
    .catch((err) => {
      console.error("Error executing query", err.stack);
    });
}
