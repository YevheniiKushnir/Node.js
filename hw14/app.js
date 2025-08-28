import "./config/env.js";
import express from "express";
import connectToDatabase from "./db/index.js";
import Category from "./models/Category.js";
import Product from "./models/Product.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.post("/categories", async (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).send({ message: "Name is required" });
  }

  try {
    const category = await Category.create({ name });
    res.status(201).send({ message: "Successfully", category });
  } catch (error) {
    next(error);
  }
});

app.post("/products", async (req, res, next) => {
  const { name, price, category } = req.body;

  if (!name || !price || !category) {
    return res
      .status(400)
      .send({ message: "Name | Price | Category are required" });
  }

  try {
    const cat = await Category.findOne({ name: category });

    if (!cat) {
      return res.status(404).send({ message: "Category not found" });
    }

    const product = await Product.create({
      name,
      price,
      category: cat._id,
    });

    res.status(201).send({ message: "Successfully", product });
  } catch (error) {
    next(error);
  }
});

app.get("/products", async (req, res, next) => {
  try {
    const products = await Product.find({}).populate("category");
    res.status(200).send({ message: "Successfully", products });
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
