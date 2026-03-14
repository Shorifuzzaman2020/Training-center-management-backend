import { Notice } from "./notice.model";
import cloudinary from "../../config/cloudinary";

const createNoticeIntoDB = async (
    payload: any,
    file?: Express.Multer.File
) => {

    let fileUrl = "";

    if (file && file.buffer) {

        const base64File = file.buffer.toString("base64");

        const uploadResponse = await cloudinary.uploader.upload(
            `data:${file.mimetype};base64,${base64File}`,
            {
                folder: "notices",
                resource_type: "auto",
            }
        );

        fileUrl = uploadResponse.secure_url;

    }

    const result = await Notice.create({
        ...payload,
        fileUrl,
    });

    return result;

};

const getAllNotices = async () => {

    return Notice.find().sort({ createdAt: -1 });

};

const updateNotice = async (id: string, payload: any) => {

    const result = await Notice.findByIdAndUpdate(
        id,
        payload,
        { new: true }
    );

    return result;

};

const deleteNotice = async (id: string) => {

    return Notice.findByIdAndDelete(id);

};

export const NoticeService = {
    createNoticeIntoDB,
    getAllNotices,
    updateNotice,
    deleteNotice,
};