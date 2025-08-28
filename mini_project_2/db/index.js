import mongoose from "mongoose";

async function connectToDB() {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    console.log("✅ DB connection established");
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB or start server:", error);
    process.exit(1);
  }
}

export default connectToDB;