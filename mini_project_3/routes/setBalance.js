import express from "express";
import User from "../models/User.js";

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const { initialBalance, id, newBalance } = req.body;

    if (!id) {
      if (typeof initialBalance !== "number" || initialBalance <= 0) {
        return res.status(400).json({
          message:
            "Invalid initialBalance: must be a number greater than or equal to 0",
        });
      }

      const user = new User({
        initialBalance,
        currentBalance: initialBalance,
        transactions: [],
      });

      await user.save();

      return res
        .status(201)
        .json({ message: "User created successfully", user });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (typeof newBalance !== "number" || newBalance <= 0) {
      return res.status(400).json({
        message:
          "Invalid newBalance: must be a number greater than or equal to 0",
      });
    }

    await user.setBalance(newBalance);

    res.json({
      message: "Balance updated",
      currentBalance: user.currentBalance,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
