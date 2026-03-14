import { IBatch } from "./batch.interface";
import { Batch } from "./batch.model";
import { Course } from "../course/course.model"; // adjust path

const createBatchIntoDB = async (payload: IBatch) => {

    // Check if course exists
    const courseExists = await Course.findById(payload.course);

    if (!courseExists) {
        throw new Error("Course not found");
    }

    const result = await Batch.create(payload);
    return result;
};

const getAllBatches = async () => {
    const result = await Batch.find()
        .populate("course", "name description") //Important
        .sort({ createdAt: -1 });

    return result;
};

const getBatchById = async (id: string) => {
    const batch = await Batch.findById(id).populate("course", "name description");

    if (!batch) {
        throw new Error("Batch not found");
    }

    return batch;
};

const updateBatch = async (id: string, payload: Partial<IBatch>) => {
    if (payload.course) {
        // Check if course exists
        const courseExists = await Course.findById(payload.course);

        if (!courseExists) {
            throw new Error("Course not found");
        }
    }

    const result = await Batch.findByIdAndUpdate(id, payload, { new: true }).populate(
        "course",
        "name description"
    );

    if (!result) {
        throw new Error("Batch not found");
    }

    return result;
};

const deleteBatch = async (id: string) => {
    return await Batch.findByIdAndDelete(id);
};

export const BatchService = {
    createBatchIntoDB,
    getAllBatches,
    deleteBatch,
    getBatchById,
    updateBatch,
};