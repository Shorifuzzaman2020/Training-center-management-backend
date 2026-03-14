import { z } from "zod";

const createRoleValidationSchema = z.object({
    body: z.object({
        name: z
            .string()
            .min(2, "Role name must be at least 2 characters"),

        description: z.string().optional(),
        createdBy: z.string().optional(),
    }),
});

const updateRoleValidationSchema = z.object({
    body: z.object({
        name: z
            .string()
            .min(2, "Role name must be at least 2 characters")
            .optional(),

        description: z.string().optional(),
        createdBy: z.string().optional(),
    }),
});

export const RoleValidation = {
    createRoleValidationSchema,
    updateRoleValidationSchema,
};