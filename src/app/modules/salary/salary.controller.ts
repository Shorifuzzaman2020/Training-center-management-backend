import { Request, Response } from "express";
import { SalaryService } from "./salary.service";

const generateSalary = async (req: Request, res: Response) => {
  try {
    const { employeeId, month, year } = req.body;

    if (!employeeId || !month || !year) {
      return res.status(400).json({
        success: false,
        message: "employeeId, month, year required",
      });
    }

    const result = await SalaryService.generateSalary(
      employeeId,
      Number(month),
      Number(year),
    );

    res.json({
      success: true,
      message: "Salary generated",
      data: result,
    });
  } catch (err: any) {
    console.log("SALARY ERROR:", err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const SalaryController = {
  generateSalary,
};
