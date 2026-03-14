import { Blog } from "./blog.model";
import cloudinary from "../../config/cloudinary";

const createBlogIntoDB = async (
    payload: any,
    file: Express.Multer.File
) => {

    const base64Image = file.buffer.toString("base64");

    const uploadResponse = await cloudinary.uploader.upload(
        `data:${file.mimetype};base64,${base64Image}`,
        {
            folder: "blogs",
        }
    );

    const imageUrl = uploadResponse.secure_url;

    const result = await Blog.create({
        author: payload.author,
        title: payload.title,
        description: payload.description,
        imageUrl,
    });

    return result;
};

const getBlogs = async () => {
    return Blog.find().sort({ createdAt: -1 });
};

const getSingleBlog = async (id: string) => {
    return await Blog.findById(id);
}

export const BlogService = {
    createBlogIntoDB,
    getBlogs,
    getSingleBlog,
};