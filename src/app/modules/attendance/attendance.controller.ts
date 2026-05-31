import { Request, Response } from "express";
import { AttendanceService } from "./attendance.service";

const markBulkAttendance = async (req: Request, res: Response) => {
  try {
    const result = await AttendanceService.bulkAttendance(req.body);

    res.status(200).json({
      success: true,
      message: "Attendance saved successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* GET MONTHLY */

const getMonthlyAttendance = async (req: Request, res: Response) => {
  try {
    const { month, year } = req.query;

    const result = await AttendanceService.getMonthlyAttendance(
      Number(month),
      Number(year),
    );

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const getAllAttendanceRecords = async (req: Request, res: Response) => {
  try {
    const result = await AttendanceService.getAllAttendance();
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const AttendanceController = {
  markBulkAttendance,
  getMonthlyAttendance,
  getAllAttendanceRecords,
};