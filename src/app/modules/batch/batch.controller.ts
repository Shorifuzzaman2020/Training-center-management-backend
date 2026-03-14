import { Request, Response } from "express";
import { BatchService } from "./batch.service";

const createBatch = async (req: Request, res: Response) => {
    try {
        const result = await BatchService.createBatchIntoDB(req.body);

        res.status(201).json({
            success: true,
            message: "Batch created successfully",
            data: result,
        });

    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

const getBatches = async (req: Request, res: Response) => {
    const result = await BatchService.getAllBatches();

    res.status(200).json({
        success: true,
        data: result,
    });
};

const getBatchById = async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const result = await BatchService.getAllBatches();
    const batch = result.find((b) => b._id.toString() === id);

    if (!batch) {
        return res.status(404).json({
            success: false,
            message: "Batch not found",
        });
    }

    res.status(200).json({
        success: true,
        data: batch,
    });
};

const updateBatch = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        const result = await BatchService.updateBatch(
            id,
            req.body
        );

        res.status(200).json({
            success: true,
            message: "Batch updated successfully",
            data: result,
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

const removeBatch = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id || Array.isArray(id)) {
        return res.status(400).json({
            success: false,
            message: "Invalid batch ID",
        });
    }

    await BatchService.deleteBatch(id);

    res.status(200).json({
        success: true,
        message: "Batch deleted",
    });
};

export const BatchController = {
    createBatch,
    getBatches,
    removeBatch,
    getBatchById,
    updateBatch,
};