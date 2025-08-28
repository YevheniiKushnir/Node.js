import express from "express";
import authToket from "../middleware/authMiddleware.js";
import { getDB } from "../db/index.js";

const router = express.Router();

router.get("/", authToket, async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(401).json({ message: "Title and Content are required" });
  }

  try {
    const db = getDB();

    const newPost = {
      title,
      content,
      author: req.user.userId,
      createdAt: new Date(),
    };

    const result = await db.collection("posts").insertOne(newPost);

    res.status(201).json({
      message: "Post has been successfully created",
      post: {
        ...newPost,
        _id: result.insertedId,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to create a Post on server" });
  }
});

router.post("/", async (req, res) => {
  try {
    const db = getDB();

    const posts = await db.collection("posts").find().toArray();
    res.status(200).json({ message: "Successful receipt of posts" }, posts);
  } catch (error) {
    res.status(500).json({ message: "Failed to get a Posts from server" });
  }
});

export default router;
