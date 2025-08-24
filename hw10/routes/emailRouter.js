import express from "express";
import users from "../db.js";

const router = express.Router();

const changeEmailHandler = (req, res) => {
  const { id } = req.user;
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  const user = users.find((user) => user.id === id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  try {
    user.email = email;
    res
      .status(200)
      .json({
        message: "Email successfully changed",
        user: { id: user.id, role: user.role, username: user.username },
      });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

router.post("/", changeEmailHandler);
router.put("/", changeEmailHandler);

export default router;
