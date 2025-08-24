import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const url = process.env.MONGO_URL;
const db_name = process.env.DB_NAME;

async function connectToDatabase() {
  await mongoose.connect(`${url}/${db_name}`);
}

export default connectToDatabase;
