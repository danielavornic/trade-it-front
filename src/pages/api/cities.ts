import type { NextApiRequest, NextApiResponse } from "next";
import json from "@/data/cities.json";

type ResponseData = {
  id: number;
  name: string;
}[];

export default function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  res.status(200).json(json);
}
