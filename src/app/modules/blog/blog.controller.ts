import { Request, Response } from "express";
import { BlogService } from "./blog.service";

// const createBlog = async (req: Request, res: Response) => {

//     try {

//         const file = req.file;

//         if (!file) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Image is required",
//             });
//         }

//         const result = await BlogService.createBlogIntoDB(
//             req.body,
//             file
//         );

//         res.status(201).json({
//             success: true,
//             message: "Blog created successfully",
//             data: result,
//         });

//     } catch (error: any) {

//         res.status(500).json({
//             success: false,
//             message: error.message,
//         });

//     }

// };


const createBlog = async (req: Request, res: Response) => {
    try {
        const file = req.file;

        if (!file) {
            return res.status(400).json({
                success: false,
                message: "Image is required",
            });
        }

        // Destructure safely from req.body
        const { author, title, description } = req.body;

        // Simple check to prevent 500 errors from Mongoose validation
        if (!author || !title || !description) {
            return res.status(400).json({
                success: false,
                message: "Missing required text fields (author, title, or description)",
            });
        }

        const result = await BlogService.createBlogIntoDB(
            { author, title, description },
            file
        );

        res.status(201).json({
            success: true,
            message: "Blog created successfully",
            data: result,
        });

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
const getBlogs = async (req: Request, res: Response) => {

    const result = await BlogService.getBlogs();

    res.status(200).json({
        success: true,
        data: result,
    });

};

const getSingleBlog = async (req: Request, res: Response) => {

    const id = req.params.id as string;

    const result = await BlogService.getSingleBlog(id);

    res.status(200).json({
        success: true,
        data: result
    });

};

export const BlogController = {
    createBlog,
    getBlogs,
    getSingleBlog,
};