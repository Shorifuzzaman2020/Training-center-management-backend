import { Request, Response } from "express";
import { generateCertificateByNID } from "./certificate.service";

export const downloadCertificate = async (req: Request, res: Response) => {
  try {
    const { nidNumber } = req.params as { nidNumber: string };

    if (!nidNumber) {
      return res.status(400).json({
        message: "NID is required",
      });
    }

    const buffer = await generateCertificateByNID(nidNumber);

    res.setHeader("Content-Type", "image/jpeg");

    // 👉 preview + download both possible
    res.setHeader(
      "Content-Disposition",
      "inline; filename=certificate.jpg"
    );

    res.send(buffer);
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

// certificate.controller.ts এ যোগ করুন:

export const verifyEligibility = async (req: Request, res: Response) => {
  try {
    const { nidNumber } = req.params as { nidNumber: string };

    if (!nidNumber) {
      return res.status(400).json({ success: false, message: "NID is required" });
    }

    // আমরা সরাসরি সার্ভিস দিয়ে চেক করব স্টুডেন্ট ও তার রেজাল্ট ঠিক আছে কি nা
    const { Admission } = require("../admission/admission.model");
    const { Result } = require("../instructor/instructor.model");

    const student = await Admission.findOne({ nidNumber });
    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found with this NID" });
    }

    const result = await Result.findOne({ student: student._id, examType: "final" });

    // ৫০ এর কম পেলে অথবা রেজাল্ট না থাকলে ফেল
    if (!result || result.marks < 50 || result.grade === "F") {
      return res.status(400).json({ 
        success: true, 
        isPassed: false, 
        message: "Sorry, you have not passed the final exam. Certificate cannot be generated." 
      });
    }

    // পাস করলে সফল রেসপন্স
    res.status(200).json({
      success: true,
      isPassed: true,
      message: "Congratulations! Student is eligible."
    });

  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};