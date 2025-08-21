import mysql from "mysql2";
import configData from "./config.js";
import dotenv from "dotenv";

dotenv.config();

const env = process.env.NODE_ENV || "development";
const config = configData[env];

const connection = mysql.createConnection({
  host: config.host,
  user: config.username,
  password: config.password,
  database: config.database,
});

connection.connect((err) => {
  if (err) {
    console.error("Failed to connect to MySQL:", err.message);
    return;
  }

  console.log("Connected to MySQL");
});

export default connection;
