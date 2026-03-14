import express from "express";
import { BatchController } from "./batch.controller";
import validateRequest from "../../middlewares/validateRequest";
import { BatchValidation } from "./batch.validation";

const router = express.Router();

router.post(
    "/create-batch",
    validateRequest(BatchValidation.createBatchValidationSchema),
    BatchController.createBatch
);

router.get("/", BatchController.getBatches);
router.get("/:id", BatchController.getBatchById);
router.patch(
    "/:id",
    validateRequest(BatchValidation.updateBatchValidationSchema),
    BatchController.updateBatch
);

router.delete("/:id", BatchController.removeBatch);

export default router;