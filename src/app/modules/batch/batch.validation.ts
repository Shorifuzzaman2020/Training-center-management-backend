import { z } from "zod";

const createBatchValidationSchema = z.object({
    body: z.object({
        batchName: z.string().min(1, "Batch name is required"),
        course: z.string().min(1, "Course is required"),
        startDate: z.string().min(1, "Start date is required"),
        endDate: z.string().min(1, "End date is required"),
        capacity: z.coerce.number().min(1, "Capacity must be at least 1"),
        status: z.enum(["Running", "Upcoming", "Completed"]),
    }),
});

const updateBatchValidationSchema = z.object({
    body: z.object({
        batchName: z.string().min(1, "Batch name is required").optional(),
        course: z.string().min(1, "Course is required").optional(),
        startDate: z.string().min(1, "Start date is required").optional(),
        endDate: z.string().min(1, "End date is required").optional(),
        capacity: z.coerce.number().min(1, "Capacity must be at least 1").optional(),
        status: z.enum(["Running", "Upcoming", "Completed"]).optional(),
    }),
});

export const BatchValidation = {
    createBatchValidationSchema,
    updateBatchValidationSchema,
};