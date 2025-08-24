import express from "express";
import dotenv from "dotenv";
import connectToDatabase from "./db/index.js";
import Publisher from "./models/Publisher.js";
import Magazine from "./models/Magazine.js";
import Article from "./models/Article.js";
import Tag from "./models/Tag.js";

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.get("/publishers", async (req, res, next) => {
  try {
    const publishers = await Publisher.find({});
    res.status(200).json({ publishers });
  } catch (error) {
    next(error);
  }
});

app.get("/magazines", async (req, res, next) => {
  try {
    const magazines = await Magazine.find({}).populate("publisher");
    res.status(200).json({ magazines });
  } catch (error) {
    next(error);
  }
});
app.get("/articles", async (req, res, next) => {
  try {
    const articles = await Article.find({}).populate("tags");
    res.status(200).json({ articles });
  } catch (error) {
    next(error);
  }
});
app.get("/tags", async (req, res, next) => {
  try {
    const tags = await Tag.find({}).populate("articles");
    res.status(200).json({ tags });
  } catch (error) {
    next(error);
  }
});

app.use((req, res) => {
  res.status(404).json({ message: "Page not found" });
});


app.use((err, req, res, next) => {
  console.error("❌ Error:", err);
  res.status(500).json({ message: "Internal Server Error", err });
});

async function startServer() {
  try {
    await connectToDatabase();

    console.log("✅ DB connection established");

    const server = app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });

    server.on("error", (err) => {
      console.error("❌ Server failed to start:", err);
      process.exit(1);
    });
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB or start server:", error);
    process.exit(1);
  }
}

startServer();
