import { z } from "zod";

const createCategoryValidationSchema = z.object({
    body: z.object({
        name: z
            .string()
            .min(2, "Course name must be at least 2 characters"),

        description: z.string().optional(),
        iconUrl: z.string().optional(),
    }),
});

const updateCategoryValidationSchema = z.object({
    body: z.object({
        name: z
            .string()
            .min(2, "Course name must be at least 2 characters")
            .optional(),

        description: z.string().optional(),
        iconUrl: z.string().optional(),
    }),
});

export const CategoryValidation = {
    createCategoryValidationSchema,
    updateCategoryValidationSchema,
};