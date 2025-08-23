import User from "../models/User.js";

const mustChangePasswordMiddleware = async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  const user = await User.findOne({ where: { email } });

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  if (user.mustChangePassword) {
    return res.status(403).json({
      message: "You must change your password",
      redirectTo: "/change-password",
    });
  }

  req.user = user;
  next();
};

export default mustChangePasswordMiddleware;
