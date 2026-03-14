import mongoose, { Schema } from "mongoose";
import { IBanner } from "./banner.interface";

const bannerSchema = new Schema<IBanner>(
    {
        heading: { type: String, },
        subHeading: { type: String, },
        imageUrl: { type: String, required: true },
    },
    { timestamps: true }
);

export const Banner = mongoose.model<IBanner>("Banner", bannerSchema);