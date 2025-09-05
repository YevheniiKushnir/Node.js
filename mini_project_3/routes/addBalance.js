import express from "express";
import User from "../models/User.js";

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const { id, amount } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Id is required" });
    }

    if (typeof amount !== "number" || amount <= 0) {
      return res.status(400).json({ message: "Amount must be positive number" });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.addTransaction({ type: "income", amount });

    res.json({
      message: "Balance updated",
      currentBalance: user.currentBalance,
      transactions: user.transactions[user.transactions.length - 1],
    });
  } catch (error) {
    next(error);
  }
});

export default router;
