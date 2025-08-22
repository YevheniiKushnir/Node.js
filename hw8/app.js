import express from "express";
import dotenv from "dotenv";
import Book from "./models/book.js";
import sequelize from "./config/db.js";

dotenv.config();

const PORT = process.env.PORT;

const app = express();

app.use(express.json());

app.get("/books", async (req, res) => {
  try {
    const data = await Book.findAll();
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/books", async (req, res) => {
  try {
    const { title, author, year } = req.body;

    if (!title || !author || !year) {
      return res
        .status(401)
        .json({ message: "Title and Author and Year are required" });
    }
    const newBook = await Book.create({ title, author, year });

    res.status(201).json({
      message: "Book has been successfully added",
      book: newBook,
    });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res
        .status(400)
        .json({ message: "Book with this title and author already exists" });
    }
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const book = await Book.findByPk(id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    const updatedBook = await book.update(data);

    res.status(200).json({
      message: "Book has been successfully updated",
      book: updatedBook,
    });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res
        .status(400)
        .json({ message: "Book with this title and author already exists" });
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Book.findByPk(id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    await book.destroy();

    res.status(200).json({
      message: "Book has been successfully deleted",
      book,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.use((req, res, next) => {
  res.status(404).json({ message: "Page not found" });
});

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("✅ DB connection established");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error);
    process.exit(1);
  }
}

startServer();
