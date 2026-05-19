import express from "express";
import { AttendanceController } from "./attendance.controller";

const router = express.Router();

/* BULK SAVE */
router.post("/bulk-attendance", AttendanceController.markBulkAttendance);

/* MONTHLY */
router.get("/monthly", AttendanceController.getMonthlyAttendance);

export default router;
