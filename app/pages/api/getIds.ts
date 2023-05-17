import type { NextApiRequest, NextApiResponse } from "next";
import data from "../../public/dataBackend.json";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let { employees, age } = req.query;

  age = age.split(",").map(Number);

  console.log(employees === "-", employees);

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
    if (correctAge && correctEmployees) {
      idsWant.push(d.id);
    }
  });

  res.status(200).json({ ids: idsWant });
}
