import type { NextApiRequest, NextApiResponse } from "next";
import data from "../../public/dataBackend.json";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("req.query", req.query);

  let { employees, age, bl1, bl2, bl3, bt } = req.query;

  // convert value back to numbers or null
  age = age === undefined ? null : age.split(",").map(Number);
  bl1 = bl1 === undefined ? null : Number(bl1);
  bl2 = bl2 === undefined ? null : Number(bl2);
  bl3 = bl3 === undefined ? null : Number(bl3);

  employees = employees === undefined ? null : employees;
  bt = bt === undefined ? null : bt;

  console.log(employees, age, bl1, bl2, bl3, bt);

  const idsWant: number[] = [];

  data.forEach((d: any) => {
    let correctAge = age === null ? true : age[0] <= d.age && age[1] >= d.age;
    let correctEmployees = employees === null ? true : employees === d.nr_e;
    let correctBl1 = bl1 === null ? true : bl1 === d.bl1;
    let correctBl2 = bl2 === null ? true : bl2 === d.bl2;
    let correctBl3 = bl3 === null ? true : bl3 === d.bl3;

    if (d.length === 2) {
      console.log("d.length===1", d);
    }

    let correctBt = bt === null ? true : bt == d.type;
    if (
      correctAge &&
      correctEmployees &&
      correctBl1 &&
      correctBl2 &&
      correctBl3 &&
      correctBt
    ) {
      idsWant.push(d.id);
    }
  });

  console.log("idsWant:", idsWant.length);

  res.status(200).json({ ids: idsWant });
}
