import express from "express";
import dotenv from "dotenv";
import { createConnectDB } from "./db/index.js";
import authRouter from "./routes/auth.js";
import postsRouter from "./routes/posts.js";

dotenv.config();

const PORT = process.env.PORT;
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Home page");
});

app.use("/auth", authRouter);
app.use("/posts", postsRouter);

app.use((req, res, next) => {
  res.status(404).send("Not Found");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

createConnectDB()
  .then(() => {
    const server = app.listen(3000, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
    server.on("error", (err) => {
      console.error("Server failed to start:", err.message);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to DB", error.message);
  });
