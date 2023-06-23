import type { NextApiRequest, NextApiResponse } from "next";
import db from "@lib/db";
// const knex = require("knex")({
//   client: "pg",
// });
const sql = require("sql-bricks");
const zlib = require("zlib");

function validateNumbers(variables) {
  const { employees, age, bl1, bl2, bl3, bt } = variables;

  const areNumbers = [employees, age, bl1, bl2, bl3, bt].every(
    (variable) =>
      variable === undefined ||
      (!isNaN(parseFloat(variable)) && isFinite(variable))
  );

  if (!areNumbers) {
    throw new Error("One or more variables are not numbers");
  }

  return true;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("req.query", req.query);

  let { employees, start, end, bl1, bl2, bl3, bt, ids } = req.query;

  // start = start === undefined ? null : Number(start);
  // end = end === undefined ? null : Number(end);
  // bl1 = bl1 === undefined ? null : Number(bl1);
  // bl2 = bl2 === undefined ? null : Number(bl2);
  // bl3 = bl3 === undefined ? null : Number(bl3);
  // employees = employees === undefined ? null : employees;
  // bt = bt === undefined ? null : bt;

  // console.log("ÖÖÖÖÖÖÖÖÖÖÖ  ", ids);

  try {
    validateNumbers(req.query);
  } catch (error) {
    console.error(error);
  }

  let select = sql
    .select("array_agg(opendata_id) AS ids")
    .from("state_06_2023");

  if (start !== undefined && end !== undefined) {
    select = select.where(sql.between("business_age", start, end));
  }

  if (bt !== undefined) {
    select = select.where("business_type", bt);
  }

  if (bl1 !== undefined) {
    select = select.where("branch_top_level_id", bl1);
  }

  if (employees !== undefined) {
    select = select.where("employees_range", employees);
  }

  //   -- CREATE INDEX ihk_branch_id_index ON location (opendata_id);
  // -- CREATE INDEX nace_id_index ON location (opendata_id);
  // -- CREATE INDEX branch_top_level_id ON location (opendata_id);

  const queryString = select.toString();
  console.log(queryString);

  db.any(queryString)
    .then((rows) => {
      console.log("result-returned: ", rows.length);

      const strData = JSON.stringify(rows[0].ids);

      zlib.gzip(strData, (err, buffer) => {
        if (!err) {
          res.setHeader("Content-Encoding", "gzip");
          res.setHeader("Content-Type", "application/json");
          res.send(buffer);
        } else {
          console.log(err);
          res.status(500).send("Error compressing data");
        }
      });

      // res.status(200).json({ ids: rows[0].ids });
    })
    .catch((err) => {
      console.error("Error executing query", err.stack);
    });
}
