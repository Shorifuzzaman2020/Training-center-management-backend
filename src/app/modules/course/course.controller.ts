import { Request, Response } from "express";
import { CourseService } from "./course.service";

const createCourse = async (req: Request, res: Response) => {
    try {
        const result = await CourseService.createCourseIntoDB(req.body);

        res.status(201).json({
            success: true,
            message: "Course created successfully",
            data: result,
        });

    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

const getCourses = async (req: Request, res: Response) => {
    const result = await CourseService.getAllCourses();

    res.status(200).json({
        success: true,
        data: result,
    });
};

const getCourseById = async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const result = await CourseService.getAllCourses();
    const course = result.find((c) => c._id.toString() === id);

    if (!course) {
        return res.status(404).json({
            success: false,
            message: "Course not found",
        });
    }

    res.status(200).json({
        success: true,
        data: course,
    });
};

const updateCourse = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        const result = await CourseService.updateCourse(
            id,
            req.body
        );

        res.status(200).json({
            success: true,
            message: "Course updated successfully",
            data: result,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Failed to update course",
            error: error.message,
        });
    }
};

const removeCourse = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id || Array.isArray(id)) {
        return res.status(400).json({
            success: false,
            message: "Invalid course ID",
        });
    }

    await CourseService.deleteCourse(id);

    res.status(200).json({
        success: true,
        message: "Course deleted",
    });
};

export const CourseController = {
    createCourse,
    getCourses,
    removeCourse,
    getCourseById,
    updateCourse,
};