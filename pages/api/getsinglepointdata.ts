import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { lat, lng } = req.query;

  // Fetch all businesses around a specific location
  const { data, error } = await supabase.rpc("businesses_at_location", {lat: 52.51351, lon: 13.38579})

  console.log(data)

  res.status(200).json(data)
}
