import express from "express";
import dotenv from "dotenv";
import connection from "./db/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.get("/", (req, res) => {
  try {
    res.send("Hello, World!");
  } catch (err) {
    console.error("Failed GET /:", err.message);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/", (req, res) => {
  try {
    const data = req.body;

    if (!data || Object.keys(data).length === 0) {
      return res.status(400).json({ error: "No data provided" });
    }

    res.json({
      message: "Data received successfully",
      data,
    });
  } catch (err) {
    console.error("Failed POST /:", err.message);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/products", (req, res) => {
  connection.query("SELECT * FROM products", (err, rows) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Internal Server Error", text: err.message });
    }
    res.json(rows);
  });
});

app.post("/products", (req, res) => {
  const { name, price } = req.body;

  if (!name || !price) {
    return res.status(401).json("Name and Price are required");
  }

  connection.query(
    "INSERT INTO products (name, price) VALUES(?, ?)",
    [name, price],
    (err, rows) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Internal Server Error", text: err.message });
      }
      res.json({ message: "Product added", productId: rows.insertId });
    }
  );
});

app.use((req, res) => {
  res.status(404).send("Route not found");
});

app.use((err, req, res, next) => {
  console.error("Unhandled error:", err.message);
  res.status(500).send("Something went wrong!");
});

app.listen(PORT, () => {
  console.log(`Server runing on http://localhost:${PORT}`);
});
