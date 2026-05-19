import { Attendance } from "../attendance/attendance.model";
import { Salary } from "./salary.model";
import { Employee } from "../employee/employee.model";

/* WEEKEND CALC */
const getWeekendDays = (month: number, year: number) => {
  let weekends = 0;
  const totalDays = new Date(year, month, 0).getDate();

  for (let i = 1; i <= totalDays; i++) {
    const day = new Date(year, month - 1, i).getDay();
    if (day === 5 || day === 6) weekends++; // Fri + Sat
  }

  return { weekends, totalDays };
};
const generateSalary = async (
  employeeId: string,
  month: number,
  year: number,
) => {
  // ✅ GET EMPLOYEE DATA
  const employee = await Employee.findById(employeeId);

  if (!employee) {
    throw new Error("Employee not found");
  }

  const baseSalary = employee.salary; // ✅ REAL SALARY

  // -----------------------

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
  let absent = 0;
  records.forEach((r) => {
    if (Number(r.status) === 1) {
      present++;
    }
  });

  /* absent auto count */

  absent = workingDays - present;

  /* ✅ NEW LOGIC */

  const paidDays = present + weekends;

  const perDay = baseSalary / totalDays;

  const netSalary = paidDays * perDay;

  const deduction = baseSalary - netSalary;

  const result = await Salary.findOneAndUpdate(
    { employee: employeeId, month, year },
    {
      employee: employeeId,
      month,
      year,
      totalDays,
      weekendDays: weekends,
      workingDays,
      presentDays: present,
      absentDays: absent,
      baseSalary, // ✅ dynamic
      perDaySalary: perDay,
      deduction,
      netSalary,
    },
    { new: true, upsert: true },
  );

  return result;
};

export const SalaryService = {
  generateSalary,
};

