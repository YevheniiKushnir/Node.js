import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pathToLogFile = path.join(__dirname, "errors.log");

const PORT = 3000;

const app = http.createServer((req, res) => {
  try {
    throw new Error("Test error");
  } catch (error) {
    const message = `${new Date()} - ${error.message}\n`;

    fs.appendFile(pathToLogFile, message, (err) => {
      if (err) {
        console.error("Failed to write to log file:", err.message);
      }
    });

    res.statusCode = 500;
    res.setHeader("Content-Type", "text/plain");
    res.end("Internal Server Error");
  }
});

app.listen(PORT, () => {
  console.log("Server started at " + PORT);
});

(async () => {
  try {
    const response = await fetch(`http://localhost:${PORT}`);

    const text = await response.text();

    console.log("Server response:", text);
  } catch (error) {
    console.error("Fetch error:", error.message);
  }
})();
