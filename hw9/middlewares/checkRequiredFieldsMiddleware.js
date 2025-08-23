const checkRequiredFieldsMiddleware = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and Password are required" });
  }

  next();
};
export default checkRequiredFieldsMiddleware;
