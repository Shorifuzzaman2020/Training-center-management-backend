import { z } from "zod";

const stringToArray = (val: unknown) => {
    if (typeof val === "string") {
        return val.split(",").map((v) => v.trim());
    }
    return val;
};

const createEmployeeValidationSchema = z.object({
    body: z.object({

        /* ---------- Employment ---------- */
        companyStaffId: z
            .string()
            .min(1, "Company Staff ID is required"),

        designation: z
            .string()
            .min(1, "Designation is required"),

        employmentType: z
            .string()
            .min(1, "Employment Type is required"),

        employmentStatus: z
            .string()
            .min(1, "Employment Status is required"),

        joiningDate: z
            .string()
            .min(1, "Joining date is required"),

        probationPeriod: z.string().optional(),
        reportingTo: z.string().optional(),

        salary: z.preprocess(
            (val) => Number(val),
            z.number().min(0, "Salary must be positive")
        ),

        weekendDays: z
            .preprocess(stringToArray, z.array(z.string()))
            .optional(),

        /* ---------- Account ---------- */
        userId: z
            .string()
            .min(1, "User ID is required"),

        password: z
            .string()
            .min(4, "Password must be at least 4 characters"),

        role: z.preprocess(
            stringToArray,
            z.array(z.string().min(1)).min(1, "At least one role must be selected")
        ),

        /* ---------- Personal ---------- */
        fullName: z
            .string()
            .min(1, "Full Name is required"),

        dateOfBirth: z
            .string()
            .min(1, "Date of Birth is required"),

        fatherName: z
            .string()
            .min(1, "Father name is required"),

        motherName: z
            .string()
            .min(1, "Mother name is required"),

        /* ---------- Contact ---------- */
        phone: z
            .string()
            .min(11, "Phone number must be 11 digits"),

        alternatePhone: z.string().optional(),

        presentAddress: z
            .string()
            .min(1, "Present address is required"),

        permanentAddress: z
            .string()
            .min(1, "Permanent address is required"),
    }),
});

const updateEmployeeValidationSchema = z.object({
    body: z.object({
        companyStaffId: z.string().optional(),
        designation: z.string().optional(),
        employmentType: z.string().optional(),
        employmentStatus: z.string().optional(),
        joiningDate: z.string().optional(),
        probationPeriod: z.string().optional(),
        reportingTo: z.string().optional(),
        salary: z.preprocess(
            (val) => (val ? Number(val) : undefined),
            z.number().min(0, "Salary must be positive").optional()
        ),
        weekendDays: z
            .preprocess(stringToArray, z.array(z.string()).optional())
            .optional(),
        userId: z.string().optional(),
        password: z.string().min(4, "Password must be at least 4 characters").optional(),
        role: z.preprocess(
            stringToArray,
            z.array(z.string().min(1)).min(1, "At least one role must be selected").optional()
        ),
        fullName: z.string().optional(),
        dateOfBirth: z.string().optional(),
        fatherName: z.string().optional(),
        motherName: z.string().optional(),
        phone: z.string().min(11, "Phone number must be 11 digits").optional(),
        alternatePhone: z.string().optional(),
        presentAddress: z.string().optional(),
        permanentAddress: z.string().optional(),
    }),
});

export const EmployeeValidation = {
    createEmployeeValidationSchema,
    updateEmployeeValidationSchema,
};