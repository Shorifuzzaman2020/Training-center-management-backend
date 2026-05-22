import { Request, Response } from "express";
import { AdmissionService } from "./admission.service";
import { Admission } from "./admission.model";

const createAdmission = async (req: Request, res: Response) => {
  try {
    const file = req.file;

    const result = await AdmissionService.createAdmissionIntoDB(req.body, file);

    res.status(201).json({
      success: true,
      message: "Admission submitted successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAdmissions = async (req: Request, res: Response) => {
  const result = await AdmissionService.getAdmissions();

  res.status(200).json({
    success: true,
    data: result,
  });
};

// export const getMyAdmissions = async (req: Request, res: Response) => {
//   try {
//     const { email } = req.query;

//     if (!email) {
//       return res.status(400).json({
//         message: "Email required",
//       });
//     }

//     const data = await Admission.find({ email });

//     res.json({
//       success: true,
//       data,
//     });
//   } catch (err) {
//     res.status(500).json({
//       message: "Failed to fetch admissions",
//     });
//   }
// };

// const updateFees = async (req: Request, res: Response) => {
//   const id = req.params.id as string;

//   const result = await AdmissionService.updateFees(id, req.body);

//   res.status(200).json({
//     success: true,
//     message: "Fee updated",
//     data: result,
//   });
// };


export const getMyAdmissions = async (req: Request, res: Response) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({
        message: "Email required",
      });
    }

    const data = await Admission.find({ email })
      .populate("course")          // 🔥 MUST
      .populate("preferredBatch")  // 🔥 MUST
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data,
    });

  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch admissions",
    });
  }
};
const updateFees = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    const { feeAmount, approve } = req.body;

    const result = await AdmissionService.updateFees(id, {
      feeAmount,
      approve,
    });

    res.status(200).json({
      success: true,
      message: approve
        ? "Admission Approved & Fee Updated"
        : "Fee Updated Successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to update fee",
    });
  }
};

const deleteAdmission = async (req: Request, res: Response) => {
  const id = req.params.id as string;

  const result = await AdmissionService.deleteAdmission(id, req.body);

  res.status(200).json({
    success: true,
    message: "Admission Deleted",
    data: result,
  });
}


export const AdmissionController = {
  createAdmission,
  getAdmissions,
  updateFees,
  deleteAdmission,
  getMyAdmissions,
};
