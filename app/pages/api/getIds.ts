import type { NextApiRequest, NextApiResponse } from "next";
import data from "../../public/dataBackend.json";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("req.query", req.query);

  let { employees, age, bl3, bt } = req.query;

  // convert value back to numbers or null
  age = age === undefined ? null : age.split(",").map(Number);
  bl3 = bl3 === undefined ? null : Number(bl3);
  employees = employees === undefined ? null : employees;
  bt = bt === undefined ? null : bt;

  console.log(employees, age, bl3, bt);

  const idsWant: number[] = [];

  data.forEach((d: any) => {
    let correctAge = age === null ? true : age[0] <= d.age && age[1] >= d.age;
    let correctEmployees = employees === null ? true : employees === d.nr_e;
    let correctBl3 = bl3 === null ? true : bl3 === d.b_id;
    let correctBt = bt === null ? true : bt == d.type;
    if (correctAge && correctEmployees && correctBl3 && correctBt) {
      idsWant.push(d.id);
    }
  });

  console.log("idsWant:", idsWant.length);

  res.status(200).json({ ids: idsWant });
}
