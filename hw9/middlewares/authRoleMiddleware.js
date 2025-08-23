import User from "../models/User.js";

const authRoleMiddleware = async (req, res, next) => {
  const { id } = req.user;

  const user = await User.findByPk(id);

  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }

  if (user.role !== "admin") {
    return res.status(403).json({ message: "Accessfull denied" });
  }

  next();
};

export default authRoleMiddleware;
