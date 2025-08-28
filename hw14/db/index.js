import mongoose from "mongoose";

const url = process.env.MONGO_URL;

async function connectToDatabase() {
  await mongoose.connect(url);
}

export default connectToDatabase;
