import { Request, Response } from "express";
import { CategoryService } from "./category.service";

const createCategory = async (req: Request, res: Response) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Category image is required",
            });
        }
        const result = await CategoryService.createCategoryIntoDB(
            req.body, 
            req.file
        );

        res.status(201).json({
            success: true,
            message: "Category created successfully",
            data: result,
        });

    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

const getAllCategories = async (req: Request, res: Response) => {
    const result = await CategoryService.getAllCategories();

    res.status(200).json({
        success: true,
        data: result,
    });
};

const getCategoryById = async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const result = await CategoryService.getAllCategories();
    const category = result.find((c) => c._id.toString() === id);

    if (!category) {
        return res.status(404).json({
            success: false,
            message: "Category not found",
        });
    }

    res.status(200).json({
        success: true,
        data: category,
    });
};

const updateCategory = async (req: Request, res: Response) => {
    const id = req.params.id as string;

    if (!id || Array.isArray(id)) {
        return res.status(400).json({
            success: false,
            message: "Invalid category ID",
        });
    }

    try {
        const updatedCategory = await CategoryService.updateCategory(
            id,
            req.body,
            req.file
        );

        res.status(200).json({
            success: true,
            message: "Category updated successfully",
            data: updatedCategory,
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

const removeCategory = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id || Array.isArray(id)) {
        return res.status(400).json({
            success: false,
            message: "Invalid course ID",
        });
    }

    await CategoryService.deleteCategory(id);

    res.status(200).json({
        success: true,
        message: "Course deleted",
    });
};

export const CategoryController = {
    createCategory,
    getAllCategories,
    removeCategory,
    getCategoryById,
    updateCategory,
};