import { Schema, model } from "mongoose";
import { IBlog } from "./blog.interface";

const blogSchema = new Schema<IBlog>(
    {
        author: { type: String, required: true},
        title: { type: String, required: true },
        description: { type: String, required: true },
        imageUrl: { type: String, required: true },
    },
    { timestamps: true }
);

export const Blog = model<IBlog>("Blog", blogSchema);