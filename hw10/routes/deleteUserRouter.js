import expess from "express";
import users from "../db.js";

const router = expess.Router();

router.delete("/", (req, res) => {
  const { id } = req.user;

  const index = users.findIndex((u) => u.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  try {
    const deletedUser = users[index];
    users.splice(index, 1);
    res.status(200).json({
      message: "Account has been successfully deleted",
      user: {
        id: deletedUser.id,
        role: deletedUser.role,
        username: deletedUser.username,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
