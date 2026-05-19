import express from "express";
import { AdmissionController } from "./admission.controller";
import multer from "multer";

const router = express.Router();

// memory storage (needed for imgbb)
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post(
  "/create-admission",
  upload.single("photo"),
  AdmissionController.createAdmission,
);

router.get("/", AdmissionController.getAdmissions);

router.patch("/:id/update-fee", AdmissionController.updateFees);
router.delete("/:id", AdmissionController.deleteAdmission);

export default router;
