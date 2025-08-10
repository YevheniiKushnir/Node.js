import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import dotenv from "dotenv";
import moment from "moment";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pathToFile = path.join(__dirname, process.env.FILENAME);

function readCounter() {
  if (!fs.existsSync(pathToFile)) {
    return 0;
  }
  const data = fs.readFileSync(pathToFile, "utf8");
  if (!data) return 0;
  const lines = data.trim().split("\n");
  return lines.length;
}

const counter = readCounter() + 1;
const logLine = `${counter} - ${moment().format("YYYY-MM-DD HH:mm:ss")}\n`;

fs.appendFile(pathToFile, logLine, (error) => {
  if (error) {
    console.error("Failed to write to the file:", error.message);
    return;
  }
  console.log("File has been written successfully.");

  fs.readFile(pathToFile, "utf-8", (error, data) => {
    if (error) {
      console.error("Failed to read the data:", error.message);
      return;
    }

    console.log("Current data: ", data);
  });
});
