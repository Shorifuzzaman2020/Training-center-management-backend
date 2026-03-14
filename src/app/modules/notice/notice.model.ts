import { Schema, model } from "mongoose";
import { INotice } from "./notice.interface";

const noticeSchema = new Schema<INotice>(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            required: true,
        },

        publishDate: {
            type: Date,
            required: true,
        },

        fileUrl: {
            type: String,
        },
    },
    { timestamps: true }
);

export const Notice = model<INotice>("Notice", noticeSchema);