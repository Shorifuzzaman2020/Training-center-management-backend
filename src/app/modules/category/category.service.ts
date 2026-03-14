import { ICategory } from "./category.interface";
import { Category } from "./category.model";
import axios from "axios";
import FormData from "form-data";
const createCategoryIntoDB = async (
    payload: ICategory,
    file: Express.Multer.File) => {

    const base64Image = file.buffer.toString("base64");

    const formData = new FormData();
    formData.append("image", base64Image);

    // upload to imgbb
    const imgbbResponse = await axios.post(
        `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`,
        formData,
        {
            headers: formData.getHeaders(),
        }
    );
    const imageUrl = imgbbResponse.data.data.display_url;
    const existing = await Category.findOne({ name: payload.name });
    if (existing) {
        throw new Error("Category already exists");
    }

    const result = await Category.create({ ...payload, iconUrl: imageUrl });
    return result;
};

const getAllCategories = async () => {
    return await Category.find().sort({ createdAt: -1 });
};

const getCategoryById = async (id: string) => {
    return await Category.findById(id);
};

const updateCategory = async (id: string, payload: Partial<ICategory>, file?: Express.Multer.File) => {
    let imageUrl: string | undefined;

    if (file) {
        const base64Image = file.buffer.toString("base64");

        const formData = new FormData();
        formData.append("image", base64Image);

        const imgbbResponse = await axios.post(
            `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`,
            formData,
            {
                headers: formData.getHeaders(),
            }
        );

        imageUrl = imgbbResponse.data.data.display_url;
    }

    const updateData: Partial<ICategory> = { ...payload };
    if (imageUrl) {
        updateData.iconUrl = imageUrl;
    }

    return await Category.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteCategory = async (id: string) => {
    return await Category.findByIdAndDelete(id);
};

export const CategoryService = {
    createCategoryIntoDB,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory,
};