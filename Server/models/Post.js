import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  model: { type: String, required: true },
  carImage: { type: String, required: true },
  carPrice: { type: Number, required: true },
  carTransmission: { type: String, enum: ['automatic', 'manual', 'semiautomatic'], required: true },
  carFuel: { type: String, enum: ['diesel', 'petrol', 'electric', 'cng', 'hybrid'], required: true },
  carCapacity: { type: Number, required: true },
  district: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
});

const PostModel = mongoose.model('Post', postSchema);

export default PostModel;
