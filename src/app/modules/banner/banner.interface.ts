import { Document } from "mongoose";

export interface IBanner extends Document {
    heading: string;
    subHeading: string;
    imageUrl: string;
    createdAt: Date;
    updatedAt: Date;
}