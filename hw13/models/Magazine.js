import mongoose, { model } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const magazineSchema = new mongoose.Schema({
  title: { type: String, required: true },
  issueNumber: { type: Number, required: true },
  publisher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: process.env.DB_COLLECTION_NAME_PUBLISHER,
    required: true,
  },
});

const Magazine = model(process.env.DB_COLLECTION_NAME_MAGAZINE, magazineSchema);

export default Magazine;
