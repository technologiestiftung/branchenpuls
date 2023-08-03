import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

export interface BusinessData {
	opendata_id: string;
	planungsraum: string;
	business_age: number;
	business_type: number;
	business_type_desc: string;
	employees_range: number;
	employees_desc: string;
	branch_top_level_desc: string;
	ihk_branch_desc: string;
	nace_desc: string;
	branch_top_level_id: number;
	ihk_branch_id: number;
	nace_id: number;
}

export interface BusinessAtPointData {
	latitude: string;
	longitude: string;
	planungsraum: string;
	businesses: Array<BusinessData>;
}

const supabase = createClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL!,
	process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
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
		// bezirk,
		// planungsraum,
		// prognoseraum,
		lat,
		lng,
	} = req.query;

	let query = supabase.rpc("businesses_at_location", {
		lat: lat,
		lon: lng,
	});

	if (start && end) {
		query = query.gte("business_age", start).lte("business_age", end);
	}

	if (bt) {
		query = query.eq("business_type", bt);
	}

	if (bl1) {
		if (typeof bl1 === "string" && bl1.includes(",")) {
			bl1 = bl1?.split(",").map((d) => d.trim());
		}
		query = query.in("branch_top_level_id", Array.isArray(bl1) ? bl1 : [bl1]);
	}

	if (bl2) {
		if (typeof bl2 === "string" && bl2.includes(",")) {
			bl2 = bl2?.split(",").map((d) => d.trim());
		}
		query = query.in("nace_id", Array.isArray(bl2) ? bl2 : [bl2]);
	}

	if (bl3) {
		if (typeof bl3 === "string" && bl3.includes(",")) {
			bl3 = bl3?.split(",").map((d) => d.trim());
		}
		query = query.in("ihk_branch_id", Array.isArray(bl3) ? bl3 : [bl3]);
	}

	if (typeof employees === "string" && employees) {
		const employeesArray = employees.split(",").map((d) => d);
		query = query.in("employees_range", employeesArray);
	}

	if (monthonly) {
		query = query.eq("created_on", `${year}_${month}_01`);
	}

	query.select("*");

	query.then((response) => {
		const { data, error } = response;

		if (data && data.length > 0) {
			const formattedData = {
				latitude: lat,
				longitude: lng,
				planungsraum: data[0].planungsraum,
				businesses: data,
			} as BusinessAtPointData;
			res.status(200).json(formattedData);
		} else {
			console.log(error);
			res.status(404);
		}
	});
}
