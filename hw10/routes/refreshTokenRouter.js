import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import users from "../db.js";

dotenv.config();
const router = express.Router();

router.post("/", (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized user" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.decode(token);

    if (!payload) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const user = users.find((u) => u.id === payload.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newToken = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    return res.json({ message: "Token refreshed", token: newToken });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
