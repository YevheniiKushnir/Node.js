import express from "express";
import dotenv from "dotenv";
import { connectToDatabase } from "./db/index.js";
import productsRouter from "./routes/productsRouter.js";

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.use("/products", productsRouter);

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
    console.error(error);
    process.exit(1);
  }
}

startServer();
