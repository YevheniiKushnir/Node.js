import "./config/dotenv.config.js";
import express from "express";
import connectDB from "./db/index.js";
import setBalanceRouter from "./routes/setBalance.js";
import addBalanceRouter from "./routes/addBalance.js";
import addExpenseRouter from "./routes/addExpense.js";
import getBalanceRouter from "./routes/getBalance.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use("/set-balance", setBalanceRouter);
app.use("/add-balance", addBalanceRouter);
app.use("/add-expense", addExpenseRouter);
app.use("/get-balance", getBalanceRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Page not found" });
});

app.use((err, req, res, next) => {
  console.error("❌ Error:", err);
  res.status(500).json({ message: "Internal Server Error", err });
});

async function startServer() {
  try {
    await connectDB();

    const server = app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });

    server.on("error", (err) => {
      console.error("Server failed to start:", err);
      process.exit(1);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

startServer();
