import { Schema, model } from "mongoose";
import { IRole } from "./role.interface";

const roleSchema = new Schema<IRole>(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        description: String,
        createdBy: {
            type: String,
            required: false,
        },
    },
    { timestamps: true }
);

export const Role = model<IRole>("Role", roleSchema);