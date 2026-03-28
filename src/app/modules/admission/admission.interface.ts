import { Document, Types } from "mongoose";

export interface IAdmission extends Document {
  fullName: string;
  dateOfBirth?: Date;
  gender?: string;
  bloodGroup?: string;
  nationality?: string;
  nidNumber?: string;

  mobileNumber: string;
  alternateMobile?: string;
  email: string;

  presentAddress?: string;
  permanentAddress?: string;

  emergencyContactName?: string;
  emergencyContactNumber?: string;
  emergencyRelation?: string;

  highestQualification?: string;
  instituteName?: string;
  passingYear?: number;
  result?: string;

  currentOccupation?: string;
  companyName?: string;
  designation?: string;

  course: Types.ObjectId;

  preferredBatch?: Types.ObjectId;

  trainingMode?: string;

  leadSource?: string;
  referenceName?: string;
  reasonForJoining?: string;

  hasLaptop?: string;
  computerSkill?: string;
  portfolioLink?: string;

  yearsOfExperience?: number;
  linkedinProfile?: string;

  tshirtSize?: string;
  specialNeeds?: string;

  photo?: string;

  feeStatus: "unpaid" | "paid";
  feeAmount: number;
}
