import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const url = process.env.MONGO_URL;

const client = new MongoClient(url);

let db;

export async function createConnectDB() {
  await client.connect();
  db = client.db();
  console.log("Connected to MongoDB");
}

export function getDB() {
  if (!db) {
    throw new Error("Database is not connected");
  }

  return db;
}
