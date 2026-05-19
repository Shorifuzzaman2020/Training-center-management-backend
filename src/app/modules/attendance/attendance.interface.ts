// attendance.interface.ts
import { Document, Types } from "mongoose";

export interface IAttendance extends Document {
  employee: Types.ObjectId;
  date: Date;
  status: 0 | 1; 
}