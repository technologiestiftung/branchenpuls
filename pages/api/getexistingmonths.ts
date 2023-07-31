import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL!,
	process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	let query = supabase.rpc("get_state_tables");
	query.select("*");

	query.then((response) => {
		const { data, error } = response;

		if (data && data.length > 0) {
			res.status(200).json(data);
		} else {
			console.log(error);
			res.status(404);
		}
	});
}
