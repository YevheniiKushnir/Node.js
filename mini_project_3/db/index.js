import mongoose from "mongoose";

const url = process.env.MONGO_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(url);
    console.log("Connected DB");
  } catch (error) {
    console.error('Failed to connect to DB', error);
  }
};

export default connectDB;
