import { Admission } from "./admission.model";
import cloudinary from "../../config/cloudinary";

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

  const result = await Admission.create({
    ...payload,
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

export const AdmissionService = {
  createAdmissionIntoDB,
  getAdmissions,
  updateFees,
  deleteAdmission,
};
