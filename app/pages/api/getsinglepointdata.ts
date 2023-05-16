import type { NextApiRequest, NextApiResponse } from "next";
import data from "../../public/dataBackend.json";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { pointid } = req.query;

  console.log("-----------   ", pointid);

  let pointData = false;

  data.forEach((d) => {
    if (Number(d.id) == pointid) {
      pointData = d;
    }
  });

  res.status(200).json({ data: pointData });
}
