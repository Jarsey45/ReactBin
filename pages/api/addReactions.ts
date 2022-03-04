import type { NextApiRequest, NextApiResponse } from 'next'
import connectDB from '../../middleware/mongodb';

type Data = {
  id: string
}

type Error = {
  error: string
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Error>
) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

 
}

export default connectDB(handler)
