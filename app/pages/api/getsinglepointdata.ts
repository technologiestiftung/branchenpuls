import type { NextApiRequest, NextApiResponse } from "next";
import data from "../../public/dataBackendIndexed.json";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { pointid } = req.query;

  res.status(200).json({ data: data[pointid] });
}
