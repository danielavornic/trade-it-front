import type { NextApiRequest, NextApiResponse } from "next";
import json from "@/data/barters.json";

export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  if (req.method === "GET") {
    const { id } = req.query;

    const transaction = json.find((p: any) => p.id === Number(id));

    if (transaction) {
      res.status(200).json(transaction);
    } else {
      res.status(404).json({ message: "transaction not found" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
