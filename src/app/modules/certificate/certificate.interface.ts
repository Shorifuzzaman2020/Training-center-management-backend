import { Types } from "mongoose";

export interface ICertificate {
  student: Types.ObjectId;
  nidNumber: string;
  course?: Types.ObjectId;
  grade: string;
  marks: number;
  issueDate: Date;
  certificateId: string;
}