import { Schema, model, Types } from "mongoose";
import { IAdmission } from "./admission.interface";

const admissionSchema = new Schema<IAdmission>(
  {
    fullName: { type: String, required: true },
    dateOfBirth: Date,
    gender: String,
    bloodGroup: String,
    nationality: String,
    nidNumber: String,

    mobileNumber: { type: String, required: true },
    alternateMobile: String,
    email: { type: String, required: true },

    presentAddress: String,
    permanentAddress: String,

    emergencyContactName: String,
    emergencyContactNumber: String,
    emergencyRelation: String,

    highestQualification: String,
    instituteName: String,
    passingYear: Number,
    result: String,

    currentOccupation: String,
    companyName: String,
    designation: String,

    course: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },

    preferredBatch: {
      type: Schema.Types.ObjectId,
      ref: "Batch",
    },
    

    trainingMode: String,

    leadSource: String,
    referenceName: String,
    reasonForJoining: String,

    hasLaptop: String,
    computerSkill: String,
    portfolioLink: String,

    yearsOfExperience: Number,
    linkedinProfile: String,

    tshirtSize: String,
    specialNeeds: String,

    photo: String,

    feeStatus: {
      type: String,
      enum: ["unpaid", "paid"],
      default: "unpaid",
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "student",
    },
    feeAmount: {
      type: Number,
      default: 0,
    },
    payments: [
      {
        amount: Number,
        transactionId: String,
        date: Date,
      },
    ],
  },
  { timestamps: true },
);

export const Admission = model<IAdmission>("Admission", admissionSchema);
