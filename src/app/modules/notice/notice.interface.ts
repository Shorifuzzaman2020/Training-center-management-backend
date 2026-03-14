import { Document } from "mongoose";

export interface INotice extends Document {

    title: string;
    description: string;

    publishDate: Date;

    fileUrl?: string;

    createdAt: Date;
    updatedAt: Date;

}