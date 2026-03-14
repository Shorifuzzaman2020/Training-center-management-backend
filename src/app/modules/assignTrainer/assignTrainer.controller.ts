import { Request, Response } from "express";
import { AssignTrainerService } from "./assignTrainer.service";

const createAssignTrainer = async (req: Request, res: Response) => {
    try {
        const result = await AssignTrainerService.createAssignTrainerIntoDB(
            req.body
        );

        res.status(201).json({
            success: true,
            message: "Trainer assigned successfully",
            data: result,
        });

    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

const getAssignedTrainers = async (req: Request, res: Response) => {
    const result = await AssignTrainerService.getAllAssignedTrainers();

    res.status(200).json({
        success: true,
        data: result,
    });
};

const getAssignedTrainerById = async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const result = await AssignTrainerService.getAllAssignedTrainers();
    const assignment = result.find((a) => a._id.toString() === id);

    if (!assignment) {
        return res.status(404).json({
            success: false,
            message: "Assignment not found",
        });
    }

    res.status(200).json({
        success: true,
        data: assignment,
    });
};

const updateAssignedTrainer = async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const result = await AssignTrainerService.getAllAssignedTrainers();
    const assignment = result.find((a) => a._id.toString() === id);

    if (!assignment) {
        return res.status(404).json({
            success: false,
            message: "Assignment not found",
        });
    }

    const updatedAssignment = await AssignTrainerService.updateAssignedTrainer(id, req.body);

    res.status(200).json({
        success: true,
        data: updatedAssignment,
    });
};

const deleteAssignedTrainer = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id || Array.isArray(id)) {
        return res.status(400).json({
            success: false,
            message: "Invalid assignment ID",
        });
    }
    await AssignTrainerService.deleteAssignment(id);

    res.status(200).json({
        success: true,
        message: "Assignment deleted",
    });
};

export const AssignTrainerController = {
    createAssignTrainer,
    getAssignedTrainers,
    getAssignedTrainerById,
    updateAssignedTrainer,
    deleteAssignedTrainer,
};