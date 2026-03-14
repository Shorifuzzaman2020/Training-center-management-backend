import express from "express";
import { AssignTrainerController } from "./assignTrainer.controller";

const router = express.Router();

router.post(
    "/create-assign-trainer",
    AssignTrainerController.createAssignTrainer
);

router.get("/", AssignTrainerController.getAssignedTrainers);
router.get("/:id", AssignTrainerController.getAssignedTrainerById);
router.patch("/:id", AssignTrainerController.updateAssignedTrainer);
router.delete("/:id", AssignTrainerController.deleteAssignedTrainer);

export default router;