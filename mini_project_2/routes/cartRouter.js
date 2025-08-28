import express from "express";
import Product from "../models/productSchema.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const products = await Product.find();

    res.status(200).json({ message: "Successfully", products });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  const { name, quantity, price } = req.body;
  if (!name || !quantity || !price) {
    return res
      .status(400)
      .json({ message: "name, quantity, price are required" });
  }
  try {
    const newProduct = await Product.create({ name, quantity, price });

    res.status(201).json({ message: "Successfully", newProduct });
  } catch (error) {
    next(error);
  }
});

router.put("/", async (req, res, next) => {
  const { name, quantity, price } = req.body;
  if (!name || quantity == null || quantity < 0 || price == null || price <= 0)
    return res.status(400).json({
      message: "Name is required, quantity must be ≥ 0, price must be > 0",
    });
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, quantity, price },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Successfully updated", product: updatedProduct });
  } catch (error) {
    next(error);
  }
});

router.delete("/", async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res
      .status(200)
      .json({
        message: "Successfully deleted",
        product: deletedProduct,
      });
  } catch (error) {
    next(error);
  }
});

export default router;
