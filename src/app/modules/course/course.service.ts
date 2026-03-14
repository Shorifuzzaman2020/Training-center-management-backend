import { Course } from "./course.model";

const createCourseIntoDB = async (payload: any) => {

    // check duplicate
    const existing = await Course.findOne({ name: payload.name });
    if (existing) {
        throw new Error("Course already exists");
    }

    const result = await Course.create(payload);
    return result;
};

const getAllCourses = async () => {
    return await Course.find().sort({ createdAt: -1 });
};

const deleteCourse = async (id: string) => {
    return await Course.findByIdAndDelete(id);
};
const getCourseById = async (id: string) => {
    return await Course.findById(id);
};

const updateCourse = async (id: string, payload: any) => {
    const result = await Course.findByIdAndUpdate(id, payload, { new: true });
    return result;
};
export const CourseService = {
    createCourseIntoDB,
    getAllCourses,
    deleteCourse,
    getCourseById,
    updateCourse,
};