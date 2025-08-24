import express from "express";
import dotenv from "dotenv";
import emailRouter from "./routes/emailRouter.js";
import loginUserRouter from "./routes/loginUserRouter.js";
import deleteUserRouter from "./routes/deleteUserRouter.js";
import updateRoleRouter from "./routes/updateRoleRouter.js";
import refreshTokenRouter from "./routes/refreshTokenRouter.js";
import authenticateJWT from "./middlewares/authenticateJWT.js";
import authorizeRole from "./middlewares/authorizeRole.js";

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.use("/login", loginUserRouter);
app.use("/update-email", authenticateJWT, emailRouter);
app.use("/delete-account", authenticateJWT, deleteUserRouter);
app.use(
  "/update-role",
  authenticateJWT,
  authorizeRole("admin"),
  updateRoleRouter
);
app.use("/refresh-token", refreshTokenRouter);

app.use((req, res, next) => {
  res.status(404).json({ message: "NOT FOUND RESOURSE" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: "Internal Server Error", err });
});

app.listen(PORT, () => {
  console.log(`Serever running on http://localhost:${PORT}`);
});
