import { Schema, model } from "mongoose";
import { ITraining } from "./training.interface";

const trainingSchema = new Schema<ITraining>(
    {
        course: {
            type: Schema.Types.ObjectId,
            ref: "Course",
            required: true,
        },

        category: {
            type: Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },

        shortDescription: {
            type: String,
        },

        longDescription: {
            type: String,
        },

        bannerImage: {
            type: String,
        },

        galleryImages: [
            {
                type: String,
            },
        ],

        facilities: [
            {
                type: String,
            },
        ],
    },
    { timestamps: true }
);

export const Training = model<ITraining>("Training", trainingSchema);