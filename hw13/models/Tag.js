import mongoose, { model } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const tagSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  articles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: process.env.DB_COLLECTION_NAME_ARTICLE,
      required: true,
    },
  ],
});

const Tag = model(process.env.DB_COLLECTION_NAME_TAG, tagSchema);

export default Tag;
