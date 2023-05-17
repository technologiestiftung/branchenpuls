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

  // let pointData = undefined;

  // data.forEach((d) => {
  //   if (Number(d.id) == pointid) {
  //     pointData = d;
  //   }
  // });

  res.status(200).json({ data: dataIndexed[pointid] });
}
