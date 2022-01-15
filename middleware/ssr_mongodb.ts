import mongoose from 'mongoose';

export default async function connectDBForSSR() {
  if (mongoose.connections[0].readyState) return

  await mongoose.connect(<string>process.env.MONGO_URL, {
    useUnifiedTopology: true,
    keepAlive: true
  } as mongoose.ConnectOptions);
}