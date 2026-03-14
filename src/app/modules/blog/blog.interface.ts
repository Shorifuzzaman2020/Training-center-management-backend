import { Document } from "mongoose";

export interface IBlog extends Document {
    author: string;
    title: string;
    description: string;
    imageUrl: string;
    createdAt: Date;
}