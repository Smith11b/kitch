import { NextApiRequest, NextApiResponse } from "next";
import companyService from "../service/companyService";



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { name, address, website, primaryColor, secondaryColor } = req.body;
       return companyService.saveCompanyInfo(name, address, website, primaryColor, secondaryColor);
    } else {
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
      return res;
    }
  }
