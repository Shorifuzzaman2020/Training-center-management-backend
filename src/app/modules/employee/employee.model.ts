import { Schema, model } from "mongoose";
import { IEmployee } from "./employee.interface";

const employeeSchema = new Schema<IEmployee>(
    {
        // Employment
        companyStaffId: { type: String, required: true, unique: true },
        designation: { type: String, required: true },
        employmentType: { type: String, required: true },
        employmentStatus: { type: String, required: true },
        joiningDate: { type: String, required: true },
        probationPeriod: String,
        reportingTo: String,
        salary: { type: Number, required: true },
        weekendDays: [String],

        // Account
        userId: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: [String],

        // Personal
        fullName: { type: String, required: true },
        dateOfBirth: { type: String, required: true },
        fatherName: { type: String, required: true },
        motherName: { type: String, required: true },

        // Contact
        phone: { type: String, required: true },
        alternatePhone: String,
        presentAddress: { type: String, required: true },
        permanentAddress: { type: String, required: true },

        // Photo
        photo: { type: String, required: true },
    },
    { timestamps: true }
);

export const Employee = model<IEmployee>("Employee", employeeSchema);