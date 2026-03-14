import { IEmployee } from "./employee.interface";
import { Employee } from "./employee.model";
import axios from "axios";
import FormData from "form-data";
const createEmployee = async (payload:
    IEmployee,
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

    const result = await Employee.create({ ...payload, photo: imageUrl });
    return result;
};
const getAllEmployees = async () => {
    return await Employee.find().sort({ createdAt: -1 });
    
}

const getEmployeeById = async (id: string) => {
    return await Employee.findById(id);
};

const updateEmployee = async (id: string, payload: Partial<IEmployee>, file?: Express.Multer.File) => {
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

    const updateData: Partial<IEmployee> = { ...payload };

    if (imageUrl) {
        updateData.photo = imageUrl;
    }

    const result = await Employee.findByIdAndUpdate(id, updateData, { new: true });
    return result;
};

const deleteEmployee = async (id: string) => {
    return await Employee.findByIdAndDelete(id);
};

export const EmployeeService = {
    createEmployee,
    getAllEmployees,
    getEmployeeById,
    updateEmployee,
    deleteEmployee,
};