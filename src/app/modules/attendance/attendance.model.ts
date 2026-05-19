// attendance.model.ts
import { Schema, model } from "mongoose";
import { IAttendance } from "./attendance.interface";

const attendanceSchema = new Schema<IAttendance>(
  {
    employee: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    status: {
      type: Number,
      enum: [0, 1], // ✅ ONLY 0 / 1
      default: 1, // default present
    },
  },
  { timestamps: true },
);

export const Attendance = model<IAttendance>("Attendance", attendanceSchema);
