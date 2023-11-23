import type { NextApiRequest, NextApiResponse } from "next";
import json from "@/data/chat-list.json";

export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  return res.status(200).json(json);
}
