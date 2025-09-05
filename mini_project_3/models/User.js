import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["income", "expense"],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    min: [0, "The transaction amount must be positive"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const userSchema = new mongoose.Schema(
  {
    initialBalance: {
      type: Number,
      required: true,
      min: [0, "Initial balance cannot be negative"],
      default: 0,
    },
    currentBalance: {
      type: Number,
      required: true,
      min: [0, "Current balance cannot be negative"],
      default: 0,
    },
    transactions: [transactionSchema],
  },
  { versionKey: false }
);

userSchema.methods.addTransaction = function (transaction) {
  if (
    transaction.type === "expense" &&
    transaction.amount > this.currentBalance
  ) {
    throw new Error("Insufficient funds for the expense");
  }

  this.currentBalance +=
    transaction.type === "income" ? transaction.amount : -transaction.amount;
  this.transactions.push(transaction);
  return this.save();
};

userSchema.methods.setBalance = function (newBalance) {
  if (newBalance < 0) {
    throw new Error("Balance cannot be negative");
  }

  this.currentBalance = newBalance;
  return this.save();
};

const User = mongoose.model("User", userSchema);

export default User;
