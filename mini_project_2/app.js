import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectToDB from "./db/index.js";
import cartRouter from "./routes/cartRouter.js";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.use("/api/cart", cartRouter);

app.use((req, res, next) => {
  res.status(404).json({ message: "Not Found" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal server error", err });
});

app.listen(PORT, async () => {
  await connectToDB();
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
