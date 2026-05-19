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