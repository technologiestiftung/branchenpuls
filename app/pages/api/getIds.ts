import type { NextApiRequest, NextApiResponse } from "next";
import data from "../../public/dataBackend.json";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { domain, business_age } = req.query;

  const idsWant = [];

  data.forEach((d) => {
    if (d.b_id === 47430) {
      idsWant.push(d.id);
    }
    // if (business_age && business_age == d.business_age) {
    //   idsWant.push(d.id);
    // }
  });

  res.status(200).json({ ids: idsWant });
}
