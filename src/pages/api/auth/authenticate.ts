import type { NextApiRequest, NextApiResponse } from "next";
var jwt = require("jsonwebtoken");

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const obj = { ...req.body, name: "Daniela", surname: "Vornic", user_id: 1 };
    const token = jwt.sign(obj, "shhhhh");
    return res.status(200).json({ token });
  }
}
