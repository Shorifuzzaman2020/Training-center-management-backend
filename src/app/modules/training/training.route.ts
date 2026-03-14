import express from "express";
import multer from "multer";
import { TrainingController } from "./training.controller";

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post(
    "/create-training",
    upload.fields([
        { name: "bannerImage", maxCount: 1 },
        { name: "galleryImages", maxCount: 10 },
    ]),
    TrainingController.createTraining
);

router.get("/", TrainingController.getTrainings);
router.get("/:id", TrainingController.getTrainingById);
router.patch(
    "/:id",
    upload.fields([
        { name: "bannerImage", maxCount: 1 },
        { name: "galleryImages", maxCount: 10 },
    ]),
    TrainingController.updateTraining
);
router.delete("/:id", TrainingController.deleteTraining);
router.post(
    "/upload-image",
    upload.single("image"),
    TrainingController.uploadTrainingImage
);

export default router;

