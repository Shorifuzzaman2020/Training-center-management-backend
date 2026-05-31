import { Request, Response } from "express";
import { Admission } from "./admission.model";
import cloudinary from "../../config/cloudinary";
import mongoose from "mongoose";
const createAdmissionIntoDB = async (
  payload: any,
  file?: Express.Multer.File,
) => {
  let photoUrl = "";

  if (file) {
    const base64 = file.buffer.toString("base64");

    const upload = await cloudinary.uploader.upload(
      `data:${file.mimetype};base64,${base64}`,
      { folder: "students" },
    );

    photoUrl = upload.secure_url;
  }

  // const result = await Admission.create({
  //   ...payload,
  //   photo: photoUrl,
  //   feeStatus: "unpaid",
  //   feeAmount: 0,
  // });
  const result = await Admission.create({
  ...payload,

  course: new mongoose.Types.ObjectId(payload.course), // 🔥 FIX
  preferredBatch: new mongoose.Types.ObjectId(payload.preferredBatch), // 🔥 FIX

  photo: photoUrl,
  feeStatus: "unpaid",
  feeAmount: 0,
});

  return result;
};

const getAdmissions = async () => {
  return Admission.find()
    .populate("course")
    .populate("preferredBatch")
    .sort({ createdAt: -1 });
};

// const updateFees = async (id: string, payload: any) => {
//   const admission = await Admission.findById(id);

//   if (!admission) {
//     throw new Error("Admission not found");
//   }

//   const amount = Number(payload.feeAmount || 0);

//   // ✅ SAFE ADD
//   admission.feeAmount = Number(admission.feeAmount || 0) + amount;

//   // ✅ FIX: ensure array exists
//   if (!Array.isArray(admission.payments)) {
//     admission.payments = [];
//   }

//   // ✅ ADD PAYMENT HISTORY
//   if (amount > 0) {
//     admission.payments.push({
//       amount,
//       date: new Date(),
//     });
//   }

//   // ✅ APPROVE
//   if (payload.approve) {
//     admission.feeStatus = "paid";
//   }

//   await admission.save();

//   return admission;
// };


const updateFees = async (id: string, payload: any) => {

  const admission = await Admission.findById(id);

  if (!admission) throw new Error("Admission not found");

  // ✅ ONLY when real input আসে
  if (payload.feeAmount !== undefined) {

    const amount = Number(payload.feeAmount);

    // ❌ prevent duplicate/self-add
    if (!isNaN(amount) && amount > 0) {

      admission.feeAmount += amount;

      if (!Array.isArray(admission.payments)) {
        admission.payments = [];
      }

      admission.payments.push({
        amount,
        transactionId: payload.transactionId,
        date: new Date(),
      });
    }
  }

  // ✅ approve আলাদা
  if (payload.approve === true) {
    admission.feeStatus = "paid";
  }

  await admission.save();

  return admission;
};

const deleteAdmission = async (id: string, payload: any) => {
  return Admission.findByIdAndDelete(id, payload);
};
const getMyAdmissions = async (email: string) => {
  return Admission.find({ email })
    .populate("course")         
    .populate("preferredBatch") 
    .sort({ createdAt: -1 });
};

const getAllAdmissions = async () => {
  return await Admission.find()
    .populate("course")
    .populate("preferredBatch"); 
};

export const AdmissionService = {
  createAdmissionIntoDB,
  getAdmissions,
  updateFees,
  deleteAdmission,
  getMyAdmissions,
  getAllAdmissions,
};
