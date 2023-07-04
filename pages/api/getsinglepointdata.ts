import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { lat, lng } = req.query;

  const { data, error } = await supabase
    .from('location')
    .select(`
      latitude,
      longitude,
      planungsraum,
      business!inner(opendata_id,business_type,business_age,created_on,updated_on)`
    )
    .eq(`latitude`, lat)
    .eq(`longitude`, lng)

  if(data) {
    const formattedData = {
      latitude: lat, 
      longitude: lng,
      planungsraum: data[0].planungsraum,
      businesses: data!.map((d) => d.business)
    }
    res.status(200).json(formattedData)
  } else {
    console.log(error)
    res.status(404)
  }
  
}
