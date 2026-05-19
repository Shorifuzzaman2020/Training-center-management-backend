import mongoose, { Schema } from "mongoose";

const certificateSchema = new Schema(
  {
    student: {
      type: Schema.Types.ObjectId,
      ref: "Admission",
      required: true,
    },
    nidNumber: {
      type: String,
      required: true,
    },
    course: {
      type: Schema.Types.ObjectId,
    },
    grade: String,
    marks: Number,
    issueDate: {
      type: Date,
      default: Date.now,
    },
    certificateId: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true }
);

export const Certificate =
  mongoose.models.Certificate ||
  mongoose.model("Certificate", certificateSchema);