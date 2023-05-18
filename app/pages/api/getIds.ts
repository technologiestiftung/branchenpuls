import type { NextApiRequest, NextApiResponse } from "next";
import data from "../../public/dataBackend.json";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("req.query", req.query);

  let { employees, age, bl3 } = req.query;
  age = age !== "null" ? age.split(",").map(Number) : null;
  bl3 = Number(bl3) ? Number(bl3) : null;
  employees = employees === "null" ? null : employees;

  const idsWant: number[] = [];

  data.forEach((d: any) => {
    let correctAge;
    if (age === null) {
      correctAge = true;
    } else {
      correctAge = age[0] <= d.age && age[1] >= d.age;
    }
    let correctEmployees;
    if (employees === null) {
      correctEmployees = true;
    } else {
      correctEmployees = employees === d.nr_e;
    }
    let correctBl3;
    if (bl3 === null) {
      correctBl3 = true;
    } else {
      correctBl3 = bl3 === d.b_id;
    }
    if (correctAge && correctEmployees && correctBl3) {
      idsWant.push(d.id);
    }
  });

  console.log("idsWant:", idsWant.length);

  res.status(200).json({ ids: idsWant });
}
