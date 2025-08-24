import mongoose, { model } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const publisherSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  location: { type: String, required: true },
});

const Publisher = model(
  process.env.DB_COLLECTION_NAME_PUBLISHER,
  publisherSchema
);

export default Publisher;
