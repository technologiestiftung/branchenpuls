import type { NextApiRequest, NextApiResponse } from "next";
import db from "@lib/db";
// const knex = require("knex")({
//   client: "pg",
// });
const sql = require("sql-bricks");
const zlib = require("zlib");

function addZero(d: number) {
  if (d.toString().length === 1) {
    return "0" + d;
  }

  return d;
}

function validateNumbers(variables) {
  const { employees, age, bl1, bl2, bl3, bt, monthonly } = variables;

  const areNumbers = [employees, age, bl1, bl2, bl3, bt, monthonly].every(
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

  let {
    employees,
    start,
    end,
    bl1,
    bl2,
    bl3,
    bt,
    ids,
    month,
    year,
    monthonly,
  } = req.query;

  try {
    validateNumbers(req.query);
  } catch (error) {
    console.error(error);
  }

  month = addZero(month);
  console.log("monthmonthmonthmonth", month);

  let select = sql
    .select("array_agg(opendata_id) AS ids")
    .from(`state_${month}_${year}`);

  if (start !== undefined && end !== undefined) {
    select = select.where(sql.between("business_age", start, end));
  }

  if (bt !== undefined) {
    select = select.where("business_type", bt);
  }

  if (bl1 !== undefined) {
    select = select.where("branch_top_level_id", bl1);
  }

  if (bl2 !== undefined) {
    select = select.where("nace_id", bl2);
  }

  if (bl3 !== undefined) {
    select = select.where("ihk_branch_id", bl3);
  }

  if (employees !== undefined) {
    select = select.where("employees_range", employees);
  }

  if (monthonly !== undefined) {
    select = select.where("created_on", `${year}_${month}_01`);
  }

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
