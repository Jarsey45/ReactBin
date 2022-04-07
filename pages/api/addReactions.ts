import type { NextApiRequest, NextApiResponse } from 'next'

import connectDB from '../../middleware/mongodb';
import BinModel from '../../models/bin';
import type { Reaction } from '../../types/Bin';
// import mongoose from 'mongoose'

type Data = {
  isSaved: boolean;
  action: 'increment' | 'decrement';
  newCount: number;
}

type BodyData = {
  _id: string;
  action: 'increment' | 'decrement';
}

type Error = {
  error: string;
}

interface ReactionNextApiRequest extends NextApiRequest {
  body: BodyData;
}

async function handler(
  req: ReactionNextApiRequest,
  res: NextApiResponse<Data | Error>
) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try{

  //@ts-ignore; I'm ignoring fact that body is a string always 
  const { _id, action } = JSON.parse(req.body) as BodyData;
  if (!(_id && action)) {
    res.status(400).json({ error: "Bad request body" });
    return;
  }

  const value = (action === "increment" ? 1 : -1); //increment or decrement


  //find specific document
  const filter = {
    reactions: {
      $elemMatch: {
        _id: _id
      }
    }
  };

  //what to update
  const update = {
    $inc: {
      [`reactions.$[outer].number`]: value
    }
  }

  //how to get specific array element
  const option = {
    arrayFilters: [{ 'outer._id': _id }],
    new: true
  }

  //increment or decrement depends on value
  const foundAndIncremented = await BinModel.findOneAndUpdate(filter, update, option).exec();
  const newCount = foundAndIncremented.get('reactions').find((el: Reaction) => el._id.toString() === _id).number;

  res.status(200).json({ isSaved: (foundAndIncremented ? true : false), action, newCount });

  }catch(err){
    res.status(500).json({error: err} as Error);
  }

}

export default connectDB(handler)
