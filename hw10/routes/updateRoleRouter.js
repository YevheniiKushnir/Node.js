import express from "express";
import users from "../db.js";

const router = express.Router();

router.post("/", (req, res) => {
  const { id, role } = req.body;

  if (!id || !role) {
    return res.status(400).json({ message: "Id and Role are required" });
  }

  const user = users.find((user) => user.id === Number(id));

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  try {
    if (req.user.id === Number(id)) {
      return res
        .status(400)
        .json({ message: "You cannot change your own role" });
    }
    user.role = role;
    res.status(200).json({
      message: "Role of user was updated",
      user: { id: user.id, role: user.role, username: user.username },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
