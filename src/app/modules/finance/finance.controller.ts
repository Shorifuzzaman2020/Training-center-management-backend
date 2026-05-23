import { Request, Response } from "express";
import { FinanceService } from "./finance.service";

export const getFinance = async (req: Request, res: Response) => {
  const data = await FinanceService.getFinanceData();

  res.json({
    success: true,
    data,
  });
};

export const createExpense = async (req: Request, res: Response) => {
  const result = await FinanceService.addExpense(req.body);

  res.json({
    success: true,
    data: result,
  });
};