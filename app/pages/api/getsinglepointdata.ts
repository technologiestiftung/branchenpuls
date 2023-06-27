import type { NextApiRequest, NextApiResponse } from "next";
import db from "@lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { pointid, lat, lng } = req.query;

  console.log("pointCoo", lat, lng);

  // key: 346706,
  // opendata_id: '825955871186',
  // business_type: 0,
  // created_on: 2023-03-31T22:00:00.000Z,
  // updated_on: 2023-05-31T22:00:00.000Z,
  // business_age: 11,
  // latitude: '52.51507',
  // longitude: '13.39234',
  // postcode: 10117,
  // bezirk: 'Mitte',
  // planungsraum: 'Oranienburger Straße',
  // bezirksregion: 'Alexanderplatz',
  // prognoseraum: 'Zentrum',
  // ortsteil: 'Mitte'

  db.any(
    `
    SELECT
      b.opendata_id, b.business_type, b.business_age, TO_CHAR(b.created_on, 'YYYY-MM-DD') AS created_on , TO_CHAR(b.updated_on, 'YYYY-MM-DD') AS updated_on 
    FROM
    business AS b
    INNER JOIN location AS l ON b.opendata_id = l.opendata_id
    WHERE
        l.latitude = ${lat} AND l.longitude = ${lng} 
    `
  )
    .then((rows) => {
      console.log(rows);

      res.status(200).json({ data: rows });
    })
    .catch((err) => {
      console.error("Error executing query", err.stack);
    });
}
