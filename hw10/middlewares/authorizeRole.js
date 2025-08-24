import users from "../db.js";

const authorizeRole = (role) => {
  return (req, res, next) => {
    const { id } = req.user;

    const user = users.find((user) => user.id === id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    try {
      if (user.role === role) {
        return next();
      }
      res.status(403).json({ message: "Access denied" });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
};

export default authorizeRole;
