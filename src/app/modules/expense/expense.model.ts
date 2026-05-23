import { Schema, model } from "mongoose";

const expenseSchema = new Schema(
  {
    title: String, // e.g. Salary / Rent
    amount: Number,
    category: {
      type: String,
      enum: ["salary", "office", "others"],
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export const Expense = model("Expense", expenseSchema);