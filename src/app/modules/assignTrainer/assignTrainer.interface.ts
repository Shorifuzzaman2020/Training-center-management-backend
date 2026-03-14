import { Types } from "mongoose";

export interface IAssignTrainer {
    category: Types.ObjectId;
    course: Types.ObjectId;
    batch: Types.ObjectId;
    trainer: Types.ObjectId;
    assignDate: Date;
}