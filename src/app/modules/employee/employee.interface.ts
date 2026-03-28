import { Document } from "mongoose";

export interface IEmployee extends Document {

    // Employment
    companyStaffId: string;
    designation: string;
    employmentType: string;
    employmentStatus: string;
    joiningDate: string;
    probationPeriod?: string;
    reportingTo?: string;
    salary: number;
    weekendDays?: string[];

    // Account
    userId: string;
    password: string;
    role: string[];

    // Personal
    fullName: string;
    dateOfBirth: string;
    fatherName: string;
    motherName: string;

    // Contact
    phone: string;
    email: string;
    alternatePhone?: string;
    presentAddress: string;
    permanentAddress: string;

    // Photo
    photo: string;
}