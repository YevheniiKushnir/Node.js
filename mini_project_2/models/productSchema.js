import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true, min: 1 },
  dateAdded: { type: Date, default: Date.now, required: true },
});
const Product = mongoose.model("Product", productSchema);

export default Product;
