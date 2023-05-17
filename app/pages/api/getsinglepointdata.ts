import type { NextApiRequest, NextApiResponse } from "next";
import data from "../../public/dataBackend.json";
const dataIndexed = {};
data.forEach((d) => {
  dataIndexed[d.id] = d;
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { pointid } = req.query;

  res.status(200).json({ data: dataIndexed[pointid] });
}
