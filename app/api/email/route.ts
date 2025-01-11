import { NextApiRequest, NextApiResponse } from "next";
import emailService from "../service/emailService";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { email } = req.body;
        return emailService.subscribe(email);
    } else {
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
      return res;
    }
  }
