// import { Request, Response } from "express";
// import { SalaryService } from "./salary.service";

// const generateSalary = async (req: Request, res: Response) => {
//   try {
//     const { employeeId, month, year } = req.body;

//     if (!employeeId || !month || !year) {
//       return res.status(400).json({
//         success: false,
//         message: "employeeId, month, year required",
//       });
//     }

//     const result = await SalaryService.generateSalary(
//       employeeId,
//       Number(month),
//       Number(year),
//     );

//     res.json({
//       success: true,
//       message: "Salary generated",
//       data: result,
//     });
//   } catch (err: any) {
//     console.log("SALARY ERROR:", err);
//     res.status(500).json({
//       success: false,
//       message: err.message,
//     });
//   }
// };

// export const SalaryController = {
//   generateSalary,
// };


import { Request, Response } from "express";
import { SalaryService } from "./salary.service";
import { Salary } from "./salary.model";
import PDFDocument from "pdfkit";

/* GENERATE SALARY */
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
      Number(year)
    );

    res.json({
      success: true,
      message: "Salary generated",
      data: result,
    });

  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* DOWNLOAD SLIP */
const downloadSlip = async (req: Request, res: Response) => {
  try {
    const salary = await Salary.findById(req.params.id).populate("employee");

    if (!salary) {
      return res.status(404).send("Salary not found");
    }

    const doc = new PDFDocument();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=salary-slip.pdf"
    );

    doc.pipe(res);

    doc.fontSize(20).text("Salary Slip", { align: "center" });

    doc.moveDown();
    doc.text(`Employee: ${(salary.employee as any).fullName}`);
    doc.text(`Month: ${salary.month}/${salary.year}`);

    doc.moveDown();
    doc.text(`Present Days: ${salary.presentDays}`);
    doc.text(`Absent Days: ${salary.absentDays}`);
    doc.text(`Weekend: ${salary.weekendDays}`);

    doc.moveDown();
    doc.text(`Base Salary: ${salary.baseSalary}`);
    doc.text(`Deduction: ${salary.deduction}`);
    doc.text(`Net Salary: ${salary.netSalary}`);

    doc.end();

  } catch (err) {
    res.status(500).send("Failed to generate slip");
  }
};

/* EXPORT */
export const SalaryController = {
  generateSalary,
  downloadSlip, 
};