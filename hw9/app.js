import express from "express";
import dotenv from "dotenv";
import sequelize from "./config/db.js";
import User from "./models/User.js";
import checkRequiredFieldsMiddleware from "./middlewares/checkRequiredFieldsMiddleware.js";
import mustChangePasswordMiddleware from "./middlewares/mustChangePasswordMiddleware.js";
import jwt from "jsonwebtoken";
import authMiddleware from "./middlewares/authMiddleware.js";
import authRoleMiddleware from "./middlewares/authRoleMiddleware.js";

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.post("/register", checkRequiredFieldsMiddleware, async (req, res) => {
  try {
    const { email, password, role } = req.body;

    const user = await User.findOne({ where: { email } });

    if (user) {
      return res.status(400).json({ message: "This Email already exists" });
    }

    const newUser = await User.create({ email, password, role: role || undefined });

    res.status(201).json({
      message: "User has been successfully created",
      user: { id: newUser.id, email: newUser.email, role: newUser.role },
    });
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      const messages = error.errors.map((err) => err.message);

      return res.status(400).json({ errors: messages });
    }

    res.status(500).json({ message: "Internal Server Error", error });
  }
});

app.post(
  "/login",
  checkRequiredFieldsMiddleware,
  mustChangePasswordMiddleware,
  async (req, res) => {
    try {
      const { password } = req.body;

      const user = req.user;

      const isValidPassword = await user.checkPassword(password);

      if (!isValidPassword) {
        return res.status(400).json({ message: "Incorrect password" });
      }

      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "15m",
        }
      );

      res.json({ message: "Login successful", token });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", error });
    }
  }
);

app.post("/change-password", authMiddleware, async (req, res) => {
  try {
    const { password: newPassword } = req.body;
    const { id } = req.user; 

    if (!newPassword) {
      return res
        .status(400)
        .json({ message: "New password is required" });
    }

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    user.password = newPassword;
    user.mustChangePassword = false;
    await user.save();

    res.status(200).json({ message: "Password successfully changed" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/change-email", authMiddleware, async (req, res) => {
  try {
    const { email :newEmail, password } = req.body;
    const {id} = req.user;

    if (!newEmail || !password) {
      return res
        .status(400)
        .json({ message: "New Email and Password are required" });
    }

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

     const isValidPassword = await user.checkPassword(password);

    if (!isValidPassword) {
      return res.status(400).json({ message: "Incorrect password" });
    } 

    user.email = newEmail;
    await user.save();

    res.status(200).json({ message: "Email successfully changed" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/delete-account", authMiddleware, async (req, res) => {
  try {
    const { id } = req.user;
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isValidPassword = await user.checkPassword(password);

    if (!isValidPassword) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    await User.destroy({ where: { id } });

    res.status(200).json({ message: "Account has been successfully deleted" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/admin", authMiddleware, authRoleMiddleware, (req, res) => {
  try {
    res.send({ message: "Admin Page" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.use((req, res) => {
  res.status(404).json({ message: "Page not found" });
});

app.use((err, req, res, next) => {
  console.error("❌ Error:", err);
  res.status(500).json({ message: "Internal Server Error", err });
});

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("✅ DB connection established");

    const server = app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });

    server.on("error", (err) => {
      console.error("❌ Server failed to start:", err);
      process.exit(1);
    });
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error);
    process.exit(1);
  }
}

startServer();
