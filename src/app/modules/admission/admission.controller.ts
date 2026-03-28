import { Request, Response } from "express";
import { AdmissionService } from "./admission.service";

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

const updateFees = async (req: Request, res: Response) => {
  const id = req.params.id as string;

  const result = await AdmissionService.updateFees(id, req.body);

  res.status(200).json({
    success: true,
    message: "Fee updated",
    data: result,
  });
};

export const AdmissionController = {
  createAdmission,
  getAdmissions,
  updateFees,
};
