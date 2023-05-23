import type { NextApiRequest, NextApiResponse } from "next";
import data from "../../public/dataBackend.json";
const dataIndexed = {};
data.forEach((d) => {
  const coos = d.lng + "" + d.lat;
  if (dataIndexed[coos]) {
    dataIndexed[coos].push(d);
  } else {
    dataIndexed[coos] = [d];
  }
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { pointid, pointCoo } = req.query;

  console.log("pointCoo", pointCoo);

  // let pointData = undefined;ñ

  // data.forEach((d) => {
  //   if (Number(d.id) == pointid) {
  //     pointData = d;
  //   }
  // });

  res.status(200).json({ data: dataIndexed[pointCoo] });
}
