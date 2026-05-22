import { Request, Response } from "express";
import { Admission } from "../admission/admission.model";
import { Result } from "../instructor/instructor.model";

export const getMyResults = async (req: Request, res: Response) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({
        message: "Email required",
      });
    }

    // 🔥 find student
    const student = await Admission.findOne({ email });

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    // 🔥 find results
    const results = await Result.find({
      student: student._id,
    });

    res.json({
      success: true,
      data: results,
    });

  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch results",
    });
  }
};