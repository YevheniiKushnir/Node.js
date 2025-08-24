import mongoose, { model } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  content: { type: String, required: true },
  tags: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: process.env.DB_COLLECTION_NAME_TAG,
      required: true,
    },
  ],
});

const Article = model(process.env.DB_COLLECTION_NAME_ARTICLE, articleSchema);

export default Article;
