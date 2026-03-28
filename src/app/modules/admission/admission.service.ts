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

const updateFees = async (id: string, payload: any) => {
  return Admission.findByIdAndUpdate(id, payload, { new: true });
};

export const AdmissionService = {
  createAdmissionIntoDB,
  getAdmissions,
  updateFees,
};
