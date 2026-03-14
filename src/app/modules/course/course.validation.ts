import { z } from "zod";

const createCourseValidationSchema = z.object({
    body: z.object({
        name: z
            .string()
            .min(2, "Course name must be at least 2 characters"),

        description: z.string().optional(),
    }),
});

const updateCourseValidationSchema = z.object({
    body: z.object({
        name: z
            .string()
            .min(2, "Course name must be at least 2 characters")
            .optional(),

        description: z.string().optional(),
    }),
});

export const CourseValidation = {
    createCourseValidationSchema,
    updateCourseValidationSchema,
};