import mongoose from 'mongoose';

const connectDB = (handler: any) => async (req: any, res: any) => {
  if (mongoose.connections[0].readyState) {
    //using current connection
    return handler(req, res);
  }


  //else use new connection
  await mongoose.connect(<string>process.env.MONGO_URL, {
    useUnifiedTopology: true
  } as mongoose.ConnectOptions);



  return handler(req, res);
};

export default connectDB;