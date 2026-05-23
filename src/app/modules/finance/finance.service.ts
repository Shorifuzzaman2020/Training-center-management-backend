import { Admission } from "../admission/admission.model";
import { Expense } from "../expense/expense.model";

const getFinanceData = async () => {

  // 💰 TOTAL INCOME
  const admissions = await Admission.find({ feeStatus: "paid" });

  const totalIncome = admissions.reduce(
    (sum, a) => sum + (a.feeAmount || 0),
    0
  );

  // 💸 TOTAL EXPENSE
  const expenses = await Expense.find();

  const totalExpense = expenses.reduce(
    (sum, e) => sum + (e.amount || 0),
    0
  );

  return {
    totalIncome,
    totalExpense,
    balance: totalIncome - totalExpense,
    expenses,
  };
};

const addExpense = async (payload: any) => {
  return Expense.create(payload);
};

export const FinanceService = {
  getFinanceData,
  addExpense,
};