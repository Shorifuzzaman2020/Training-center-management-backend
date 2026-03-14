import mongoose, { Schema } from "mongoose";
import { IBatch } from "./batch.interface";

const batchSchema = new Schema<IBatch>(
    {
        batchName: {
            type: String,
            required: true,
            trim: true,
        },
        course: {
            type: Schema.Types.ObjectId,
            ref: "Course",
            required: true,
        },
        startDate: {
            type: Date,
            required: true,
        },
        endDate: {
            type: Date,
            required: true,
        },
        capacity: {
            type: Number,
            required: true,
            min: 1,
        },
        status: {
            type: String,
            enum: ["Running", "Upcoming", "Completed"],
            default: "Upcoming",
        },
    },
    { timestamps: true }
);

export const Batch = mongoose.model<IBatch>("Batch", batchSchema);