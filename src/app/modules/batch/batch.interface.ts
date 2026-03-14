import { Types } from "mongoose";

export interface IBatch {
    batchName: string;
    course: Types.ObjectId;   // Reference to Course
    startDate: Date;
    endDate: Date;
    capacity: number;
    status: "Running" | "Upcoming" | "Completed";
}