import { Schema, model } from "mongoose";
import { IAssignTrainer } from "./assignTrainer.interface";

const assignTrainerSchema = new Schema<IAssignTrainer>(
    {
        category: {
            type: Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },
        course: {
            type: Schema.Types.ObjectId,
            ref: "Course",
            required: true,
        },
        batch: {
            type: Schema.Types.ObjectId,
            ref: "Batch",
            required: true,
        },
        trainer: {
            type: Schema.Types.ObjectId,
            ref: "Employee",
            required: true,
        },
        assignDate: {
            type: Date,
            required: true,
        },
    },
    { timestamps: true }
);

export const AssignTrainer = model<IAssignTrainer>(
    "AssignTrainer",
    assignTrainerSchema
);