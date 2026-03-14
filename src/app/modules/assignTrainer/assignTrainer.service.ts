import { AssignTrainer } from "./assignTrainer.model";
import { IAssignTrainer } from "./assignTrainer.interface";

const createAssignTrainerIntoDB = async (payload: IAssignTrainer) => {
    return await AssignTrainer.create(payload);
};

const getAllAssignedTrainers = async () => {
    return await AssignTrainer.find()
        .populate("category", "name")
        .populate("course", "name")
        .populate("batch", "batchName")
        .populate("trainer", "fullName")
        .sort({ createdAt: -1 });
};

const getAssignedTrainerById = async (id: string) => {
    return await AssignTrainer.findById(id)
        .populate("category", "name")
        .populate("course", "name")
        .populate("batch", "batchName")
        .populate("trainer", "fullName");
};

const updateAssignedTrainer = async (id: string, payload: Partial<IAssignTrainer>) => {
    return await AssignTrainer.findByIdAndUpdate(id, payload, { new: true })
        .populate("category", "name")
        .populate("course", "name")
        .populate("batch", "batchName")
        .populate("trainer", "fullName");
};

const deleteAssignment = async (id: string) => {
    return await AssignTrainer.findByIdAndDelete(id);
};

export const AssignTrainerService = {
    createAssignTrainerIntoDB,
    getAllAssignedTrainers,
    getAssignedTrainerById,
    updateAssignedTrainer,
    deleteAssignment,
};