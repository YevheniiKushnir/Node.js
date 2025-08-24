import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const url = process.env.MONGO_URL;
const db_name = process.env.DB_NAME;
const client = new MongoClient(url);
let dbConnection = false;

async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected successfully to MongoDB");
    dbConnection = client.db(db_name);
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
    throw err;
  }
}

function getDb() {
  if (!dbConnection) {
    throw new Error("Database not connected!");
  }
  return dbConnection;
}

export { connectToDatabase, getDb };
