import { Schema, model } from "mongoose";
import { ICourse } from "./course.interface";

const courseSchema = new Schema<ICourse>(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        description: String,
    },
    { timestamps: true }
);

export const Course = model<ICourse>("Course", courseSchema);