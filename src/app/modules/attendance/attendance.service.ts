// attendance.service.ts
import { Attendance } from "./attendance.model";

const bulkAttendance = async (payload: any[]) => {

  if (!Array.isArray(payload)) {
    throw new Error("Payload must be an array");
  }

  const operations = payload.map((item) => {

    if (!item.employee || item.status === undefined || !item.date) {
      throw new Error("Invalid attendance data");
    }

    return {
      updateOne: {
        filter: {
          employee: item.employee,
          date: new Date(item.date),
        },
        update: {
          $set: {
            status: Number(item.status) as 0 | 1
          },
        },
        upsert: true,
      },
    };
  });

  return await Attendance.bulkWrite(operations);
};


/* MONTHLY */

const getMonthlyAttendance = async (month: number, year: number) => {

  const start = new Date(year, month - 1, 1);
  const end = new Date(year, month, 0);

  return Attendance.find({
    date: { $gte: start, $lte: end },
  }).populate("employee");

};


const getAllAttendance = async () => {
  return await Attendance.find().populate("employee").sort({ date: -1 });
};

export const AttendanceService = {
  bulkAttendance,
  getMonthlyAttendance,
  getAllAttendance, 
};