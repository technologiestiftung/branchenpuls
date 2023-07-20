import type { NextApiRequest, NextApiResponse } from "next";
const zlib = require("zlib");
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL!,
	process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

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
		month,
		year,
		monthonly,
		bezirk,
		planungsraum,
		prognoseraum,
	} = req.query;

	let formattedMonth = month?.length === 1 ? `0${month}` : `${month}`;

	let query = supabase.from(`state_${formattedMonth}_${year}`).select(`
    opendata_id
  `);

	if (start && end) {
		query = query.gte("business_age", start).lte("business_age", end);
	}

	if (bt) {
		query = query.eq("business_type", bt);
	}

	if (bl1) {
		if (bl1.includes(",")) {
			bl1 = bl1?.split(",").map((d) => Number(d.trim()));
		}
		query = query.in("branch_top_level_id", Array.isArray(bl1) ? bl1 : [bl1]);
	}

	if (bl2) {
		if (bl2.includes(",")) {
			bl2 = bl2?.split(",").map((d) => Number(d.trim()));
		}
		query = query.in("nace_id", Array.isArray(bl2) ? bl2 : [bl2]);
	}

	if (bl3) {
		if (bl3.includes(",")) {
			bl3 = bl3?.split(",").map((d) => Number(d.trim()));
		}
		query = query.in("ihk_branch_id", Array.isArray(bl3) ? bl3 : [bl3]);
	}

	if (employees) {
		const employeesArray = employees.split(",").map(Number);
		query = query.in("employees_range", employeesArray);
	}

	if (monthonly) {
		query = query.eq("created_on", `${year}_${month}_01`);
	}

	if (bezirk) {
		query = query.eq("bezirk", bezirk);
	}

	if (planungsraum) {
		query = query.eq("planungsraum", planungsraum);
	}

	if (prognoseraum) {
		query = query.eq("prognoseraum", prognoseraum);
	}

	query.then((response) => {
		const strData = JSON.stringify(response.data?.map((d) => d.opendata_id));

		zlib.gzip(strData, (err: any, buffer: any) => {
			if (!err) {
				console.log("sending zipped data");
				res.setHeader("Content-Encoding", "gzip");
				res.setHeader("Content-Type", "application/json");
				res.send(buffer);
			} else {
				console.log(err);
				res.status(500).send("Error compressing data");
			}
		});
	});
}
