import type { NextApiRequest, NextApiResponse } from "next";
import data from "../../public/dataBackend.json";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let { employees, age, l3 } = req.query;
  console.log("l3---", l3, req.query);
  age = age.split(",").map(Number);
  l3 = Number(l3) ? Number(l3) : null;

  console.log("l3", l3);

  const idsWant: number[] = [];

  data.forEach((d: any) => {
    let correctAge;
    if (age[0] === 0 && age[1] === 100) {
      correctAge = true;
    } else {
      correctAge = age[0] <= d.age && age[1] >= d.age;
    }
    let correctEmployees;
    if (employees === "-") {
      correctEmployees = true;
    } else {
      correctEmployees = employees === d.nr_e;
    }
    let correctL3;
    if (l3 === null) {
      correctL3 = true;
    } else {
      correctL3 = l3 === d.b_id;
    }
    if (correctAge && correctEmployees && correctL3) {
      idsWant.push(d.id);
    }
  });

  res.status(200).json({ ids: idsWant });
}
