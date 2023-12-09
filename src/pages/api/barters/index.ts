import type { NextApiRequest, NextApiResponse } from "next";
import json from "@/data/barters.json";

export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  res.status(200).json(json);
}
