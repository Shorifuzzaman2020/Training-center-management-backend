import { Schema, model } from "mongoose";

const salarySchema = new Schema(
  {
    employee: { type: Schema.Types.ObjectId, ref: "Employee", required: true },
    month: { type: Number, required: true },
    year: { type: Number, required: true },

    totalDays: Number,
    weekendDays: Number,
    workingDays: Number,

    presentDays: Number,
    absentDays: Number,

    baseSalary: Number,
    perDaySalary: Number,
    deduction: Number,
    netSalary: Number,
  },
  { timestamps: true },
);

// 👉 prevent duplicate salary for same month
salarySchema.index({ employee: 1, month: 1, year: 1 }, { unique: true });

export const Salary = model("Salary", salarySchema);
