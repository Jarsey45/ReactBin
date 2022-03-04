import Bin from '../../models/bin';
import type { NextApiRequest, NextApiResponse } from 'next'
import { v4 as uuidv4 } from 'uuid';
import connectDB from '../../middleware/mongodb';
import type { Reaction, BinType } from '../../types/Bin';

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

  try {

    const reqData = JSON.parse(req.body);
    if (reqData.text.trim() === '') throw 'Cannot save empty bin';

    const reactions = [
      {
        name: "like",
        number: 0
      },
      {
        name: "love",
        number: 0
      },
      {
        name: "dislike",
        number: 0
      },
      {
        name: "trash",
        number: 0
      }
    ] as Reaction[];

    const bin = new Bin({
      _id: uuidv4(),
      text: reqData.text as string,
      lang: reqData.lang as string,
      reactions
    } as BinType)


    const saved = await bin.save();

    console.log(saved);

    if(saved)
      res.status(200).json({ id: bin.get("_id") })
  } catch (err: any) { res.status(500).send(err.message) }
}

export default connectDB(handler)
