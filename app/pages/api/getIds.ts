import type { NextApiRequest, NextApiResponse } from "next";
import data from "../../public/dataBackend.json";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let { domain, age } = req.query;

  age = age.split(",").map(Number);

  console.log("AGAGAGAGAGA", typeof age, age, age[1]);

  const idsWant: number[] = [];

  data.forEach((d: any) => {
    if (age[0] <= d.age && age[1] >= d.age) {
      idsWant.push(d.id);
    }
  });

  res.status(200).json({ ids: idsWant });
}
