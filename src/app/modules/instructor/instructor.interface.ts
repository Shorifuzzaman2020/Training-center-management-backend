import { Types } from "mongoose";

export interface IStudentAttendance {
  student: Types.ObjectId;
  date: Date;
  status: 0 | 1;
  instructor: Types.ObjectId;
}

export interface IResult {
  student: Types.ObjectId;
  marks: number;
  grade: string;
  examType: string;
  instructor: Types.ObjectId;
}
