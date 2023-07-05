import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

export interface BusinessData {
	opendata_id: string;
	planungsraum: string;
	business_age: number;
	business_type: string;
	employees_range: string;
	branch_top_level_description: string;
	branch_description: string;
	branch_nace: string;
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
	const { lat, lng } = req.query;

	const { data, error } = await supabase
		.rpc("businesses_at_location", {
			lat: lat,
			lon: lng,
		})
		.select("*");

	console.log(data);

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
}
