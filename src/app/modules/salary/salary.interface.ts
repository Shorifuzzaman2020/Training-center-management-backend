import { Types } from "mongoose";

export interface ISalary {
  employee: Types.ObjectId | {
    fullName: string;
  };

  month: number;
  year: number;

  presentDays: number;
  absentDays: number;
  weekendDays: number;

  baseSalary: number;
  deduction: number;
  netSalary: number;
}