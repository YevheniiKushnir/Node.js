import express from "express";
import User from "../models/User.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Id is required" });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: `User balance by ID:${user._id}`,
      currentBalance: user.currentBalance,
      initialBalance: user.initialBalance,
      transactions: user.transactions,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
