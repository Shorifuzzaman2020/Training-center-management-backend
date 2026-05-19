import { createCanvas } from "canvas";
import { Admission } from "../admission/admission.model";
import { Result } from "../instructor/instructor.model";
import { Certificate } from "./certificate.model";

const generateCertificateId = () => {
  return "CERT-" + Date.now();
};

export const generateCertificateByNID = async (nidNumber: string) => {

  /* 🔍 FIND STUDENT */
  const student = await Admission.findOne({ nidNumber });

  if (!student) throw new Error("Student not found");

  /* 🔍 FIND RESULT */
  const result = await Result.findOne({
    student: student._id,
    examType: "final",
  });

  if (!result || result.marks < 50) {
    throw new Error("Student did not pass");
  }

  /* 🔐 CHECK IF ALREADY GENERATED */
  let cert = await Certificate.findOne({ nidNumber });

  if (!cert) {
    cert = await Certificate.create({
      student: student._id,
      nidNumber,
      grade: result.grade,
      marks: result.marks,
      certificateId: generateCertificateId(),
    });
  }

  /* 🎨 GENERATE IMAGE */
  const canvas = createCanvas(1000, 700);
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, 1000, 700);

  ctx.font = "bold 40px Arial";
  ctx.fillStyle = "#000";
  ctx.fillText("Certificate of Completion", 250, 150);

  ctx.font = "bold 30px Arial";
  ctx.fillText(student.fullName, 350, 300);

  ctx.font = "20px Arial";
  ctx.fillText("has successfully completed the course", 300, 350);

  ctx.fillText(`Marks: ${result.marks}`, 400, 400);
  ctx.fillText(`Grade: ${result.grade}`, 400, 430);

  ctx.fillText(`Certificate ID: ${cert.certificateId}`, 300, 500);

  return canvas.toBuffer("image/jpeg");
};