import type { NextApiRequest, NextApiResponse } from "next";
const zlib = require("zlib");
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

// Usage in your handler function
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { date } = req.query;

  console.log("date", date);

  const {data, error} = await supabase.from(`state_0${date}_2023`).select(`opendata_id, latitude, longitude`)
  const formattedData = data?.map((d) => {
    return {id: d.opendata_id, p: [d.longitude, d.latitude]}
  })


  try {
    const strData = JSON.stringify(formattedData);
    zlib.gzip(strData, (err: any, buffer: any) => {
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