import mongoose from 'mongoose';

const Schema = mongoose.Schema;


const BinSchema = new Schema({
  _id: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  reactions: {
    type: [{
      name: {
        type: String,
        required: true
      },
      number: Number
    }],
    required: true
  },
  lang: {
    type: String,
    default: "txt"
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
})


export default mongoose.models.Bin || mongoose.model('Bin', BinSchema, 'bins');