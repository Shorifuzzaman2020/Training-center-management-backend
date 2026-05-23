// import { Attendance } from "../attendance/attendance.model";
// import { Salary } from "./salary.model";
// import { Employee } from "../employee/employee.model";

// /* WEEKEND CALC */
// const getWeekendDays = (month: number, year: number) => {
//   let weekends = 0;
//   const totalDays = new Date(year, month, 0).getDate();

//   for (let i = 1; i <= totalDays; i++) {
//     const day = new Date(year, month - 1, i).getDay();
//     if (day === 5 || day === 6) weekends++; // Fri + Sat
//   }

//   return { weekends, totalDays };
// };
// const generateSalary = async (
//   employeeId: string,
//   month: number,
//   year: number,
// ) => {
//   // ✅ GET EMPLOYEE DATA
//   const employee = await Employee.findById(employeeId);

//   if (!employee) {
//     throw new Error("Employee not found");
//   }

//   const baseSalary = employee.salary; // ✅ REAL SALARY

//   // -----------------------

//   const totalDays = new Date(year, month, 0).getDate();

//   let weekends = 0;

//   for (let i = 1; i <= totalDays; i++) {
//     const day = new Date(year, month - 1, i).getDay();
//     if (day === 5 || day === 6) weekends++;
//   }

//   const workingDays = totalDays - weekends;

//   const start = new Date(year, month - 1, 1);
//   const end = new Date(year, month - 1, totalDays);

//   const records = await Attendance.find({
//     employee: employeeId,
//     date: { $gte: start, $lte: end },
//   });

//   let present = 0;
//   let absent = 0;
//   records.forEach((r) => {
//     if (Number(r.status) === 1) {
//       present++;
//     }
//   });

//   /* absent auto count */

//   absent = workingDays - present;

//   /* ✅ NEW LOGIC */

//   const paidDays = present + weekends;

//   const perDay = baseSalary / totalDays;

//   const netSalary = paidDays * perDay;

//   const deduction = baseSalary - netSalary;

//   const result = await Salary.findOneAndUpdate(
//     { employee: employeeId, month, year },
//     {
//       employee: employeeId,
//       month,
//       year,
//       totalDays,
//       weekendDays: weekends,
//       workingDays,
//       presentDays: present,
//       absentDays: absent,
//       baseSalary, // ✅ dynamic
//       perDaySalary: perDay,
//       deduction,
//       netSalary,
//     },
//     { new: true, upsert: true },
//   );

//   return result;
// };

// export const SalaryService = {
//   generateSalary,
// };



import { Attendance } from "../attendance/attendance.model";
import { Salary } from "./salary.model";
import { Employee } from "../employee/employee.model";
import { Admission } from "../admission/admission.model";
import { Expense } from "../expense/expense.model";

const generateSalary = async (
  employeeId: string,
  month: number,
  year: number,
) => {

  /* ❌ DUPLICATE BLOCK */
  const existing = await Salary.findOne({ employee: employeeId, month, year });

  if (existing) {
    throw new Error("Salary already generated for this month");
  }

  /* ✅ EMPLOYEE */
  const employee = await Employee.findById(employeeId);
  if (!employee) throw new Error("Employee not found");

  const baseSalary = employee.salary;

  /* ✅ TOTAL INCOME CHECK */
  const admissions = await Admission.find({ feeStatus: "paid" });

  const totalIncome = admissions.reduce(
    (sum, a) => sum + (a.feeAmount || 0),
    0
  );

  /* 🔥 BALANCE CHECK */
  const expenses = await Expense.find();

  const totalExpense = expenses.reduce(
    (sum, e) => sum + (e.amount || 0),
    0
  );

  const balance = totalIncome - totalExpense;

  if (balance < baseSalary) {
    throw new Error("Not enough balance to pay salary");
  }

  /* ---------------------- */

  const totalDays = new Date(year, month, 0).getDate();

  let weekends = 0;

  for (let i = 1; i <= totalDays; i++) {
    const day = new Date(year, month - 1, i).getDay();
    if (day === 5 || day === 6) weekends++;
  }

  const workingDays = totalDays - weekends;

  const start = new Date(year, month - 1, 1);
  const end = new Date(year, month - 1, totalDays);

  const records = await Attendance.find({
    employee: employeeId,
    date: { $gte: start, $lte: end },
  });

  let present = 0;

  records.forEach((r) => {
    if (Number(r.status) === 1) present++;
  });

  const absent = workingDays - present;

  const paidDays = present + weekends;

  const perDay = baseSalary / totalDays;

  const netSalary = paidDays * perDay;

  const deduction = baseSalary - netSalary;

  /* ✅ SAVE SALARY */
  const result = await Salary.create({
    employee: employeeId,
    month,
    year,
    totalDays,
    weekendDays: weekends,
    workingDays,
    presentDays: present,
    absentDays: absent,
    baseSalary,
    perDaySalary: perDay,
    deduction,
    netSalary,
  });

  /* 🔥 ADD TO EXPENSE */
  await Expense.create({
    title: `Salary - ${employee.fullName}`,
    amount: netSalary,
    category: "salary",
  });

  return result;
};

export const SalaryService = {
  generateSalary,
};