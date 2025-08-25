import express, { json } from "express";
import dotenv from "dotenv";
import { getDb } from "../db/index.js";
import { ObjectId } from "mongodb";

dotenv.config();

const router = express.Router();

router.post("/", async (req, res, next) => {
  const { name, price, description } = req.body;

  if (!name || !price || !description) {
    return res
      .status(400)
      .json({ message: "Name & Price & Description are required" });
  }

  try {
    const db = getDb();
    const productsCollection = db.collection(process.env.DB_COLLECTION_NAME);
    await productsCollection.insertOne({ name, price, description });

    res.status(201).json({
      message: "New Product has been created",
      product: { name, price, description },
    });
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const db = getDb();
    const productsCollection = db.collection(process.env.DB_COLLECTION_NAME);
    const products = await productsCollection.find({}).toArray();

    res.status(200).json({
      message: "Products retrieved successfully",
      products,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid id format" });
  }

  try {
    const db = getDb();
    const productsCollection = db.collection(process.env.DB_COLLECTION_NAME);
    const product = await productsCollection.findOne({ _id: new ObjectId(id) });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product retrieved successfully",
      product,
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  const updates = req.body;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid id format" });
  }

  if (Object.keys(updates).length === 0) {
    return res.status(400).json({ message: "No fields provided for update" });
  }

  try {
    const db = getDb();
    const productsCollection = db.collection(process.env.DB_COLLECTION_NAME);

    const result = await productsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updates }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    const product = await productsCollection.findOne({ _id: new ObjectId(id) });

    res.status(200).json({
      message: "Product successfully updated",
      product,
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid id format" });
  }

  try {
    const db = getDb();
    const productsCollection = db.collection(process.env.DB_COLLECTION_NAME);
    const result = await productsCollection.deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    next(error);
  }
});

export default router;
