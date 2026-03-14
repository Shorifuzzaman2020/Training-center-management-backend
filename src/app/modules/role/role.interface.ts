import { Document } from "mongoose";

export interface IRole extends Document {
    name: string;
    description?: string;
    createdBy: string;
    createdAt: Date;
    updatedAt: Date;
}