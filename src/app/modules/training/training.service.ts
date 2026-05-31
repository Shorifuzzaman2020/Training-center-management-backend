// import axios from "axios";
// import FormData from "form-data";
// import { Training } from "./training.model";

// const uploadImage = async (file: Express.Multer.File) => {

//     const base64 = file.buffer.toString("base64");

//     const formData = new FormData();
//     formData.append("image", base64);

//     const res = await axios.post(
//         `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`,
//         formData,
//         { headers: formData.getHeaders() }
//     );

//     return res.data.data.display_url;
// };

// // const createTrainingIntoDB = async (
// //     payload: any,
// //     banner: Express.Multer.File,
// //     gallery: Express.Multer.File[]
// // ) => {

// //     const bannerUrl = await uploadImage(banner);

// //     const galleryUrls = [];

// //     for (const img of gallery) {
// //         const url = await uploadImage(img);
// //         galleryUrls.push(url);
// //     }

// //     const result = await Training.create({
// //         ...payload,
// //         bannerImage: bannerUrl,
// //         galleryImages: galleryUrls,
// //     });

// //     return result;
// // };


// const createTrainingIntoDB = async (
//     payload: any,
//     banner?: Express.Multer.File,
//     gallery?: Express.Multer.File[]
// ) => {

//     let bannerUrl = "";

//     if (banner) {
//         bannerUrl = await uploadImage(banner);
//     }

//     const galleryUrls: string[] = [];

//     if (gallery && gallery.length) {
//         for (const img of gallery) {
//             const url = await uploadImage(img);
//             galleryUrls.push(url);
//         }
//     }

//     const result = await Training.create({
//         ...payload,
//         bannerImage: bannerUrl,
//         galleryImages: galleryUrls,
//     });

//     return result;
// };
// const getAllTrainings = async () => {
//     return await Training.find()
//         .populate("course", "name")
//         .populate("category", "name")
//         .sort({ createdAt: -1 });
// };

// const getTrainingById = async (id: string) => {
//     return await Training.findById(id)
//         .populate("course", "name")
//         .populate("category", "name");
// };
// // const updateTraining = async (id: string, payload: any) => {
// //     return await Training.findByIdAndUpdate(id, payload, { new: true })
// //         .populate("course", "name")
// //         .populate("category", "name");
// // };

// const updateTraining = async (
//     id: string, 
//     payload: any,
//     banner?: Express.Multer.File,
//     gallery?: Express.Multer.File[]
// ) => {
//     // Handle image uploads if new images are provided
//     let bannerUrl = undefined;
//     if (banner) {
//         bannerUrl = await uploadImage(banner);
//     }

//     let galleryUrls: string[] | undefined = undefined;
//     if (gallery && gallery.length > 0) {
//         galleryUrls = [];
//         for (const img of gallery) {
//             const url = await uploadImage(img);
//             galleryUrls.push(url);
//         }
//     }

//     // Build update object with only the fields that are provided
//     const updateData: any = { ...payload };
    
//     if (bannerUrl) {
//         updateData.bannerImage = bannerUrl;
//     }
    
//     if (galleryUrls) {
//         updateData.galleryImages = galleryUrls;
//     }

//     // Remove undefined fields
//     Object.keys(updateData).forEach(key => 
//         updateData[key] === undefined && delete updateData[key]
//     );

//     return await Training.findByIdAndUpdate(id, updateData, { new: true })
//         .populate("course", "name")
//         .populate("category", "name");
// };

// const deleteTraining = async (id: string) => {
//     return await Training.findByIdAndDelete(id);
// };
// export const TrainingService = {
//     createTrainingIntoDB,
//     getAllTrainings,
//     getTrainingById,
//     updateTraining,
//     deleteTraining,
// };

import cloudinary from "../../config/cloudinary"; // আপনার ক্লাউডিনারি কনফিগ পাথ নিশ্চিত করুন
import { Training } from "./training.model";

// ক্লাউডিনারিতে সিঙ্গেল ইমেজ আপলোডের হেল্পার ফাংশন
const uploadToCloudinary = async (file: Express.Multer.File, folderName: string): Promise<string> => {
    const base64File = file.buffer.toString("base64");
    const uploadResponse = await cloudinary.uploader.upload(
        `data:${file.mimetype};base64,${base64File}`,
        {
            folder: folderName,
            resource_type: "auto",
        }
    );
    return uploadResponse.secure_url;
};

const createTrainingIntoDB = async (
    payload: any,
    banner?: Express.Multer.File,
    gallery?: Express.Multer.File[]
) => {
    let bannerImage = "";

    if (banner) {
        bannerImage = await uploadToCloudinary(banner, "trainings/banners");
    }

    const galleryImages: string[] = [];

    if (gallery && gallery.length) {
        // সব ইমেজ একসাথে দ্রুত আপলোড করার জন্য Promise.all ব্যবহার করা হয়েছে
        const uploadPromises = gallery.map((img) => uploadToCloudinary(img, "trainings/gallery"));
        const urls = await Promise.all(uploadPromises);
        galleryImages.push(...urls);
    }

    const result = await Training.create({
        ...payload,
        bannerImage,
        galleryImages,
    });

    return result;
};

const getAllTrainings = async () => {
    return await Training.find()
        .populate("course", "name")
        .populate("category", "name")
        .sort({ createdAt: -1 });
};

const getTrainingById = async (id: string) => {
    return await Training.findById(id)
        .populate("course", "name")
        .populate("category", "name");
};

const updateTraining = async (
    id: string, 
    payload: any,
    banner?: Express.Multer.File,
    gallery?: Express.Multer.File[]
) => {
    let bannerImage = undefined;
    if (banner) {
        bannerImage = await uploadToCloudinary(banner, "trainings/banners");
    }

    let galleryImages: string[] | undefined = undefined;
    if (gallery && gallery.length > 0) {
        const uploadPromises = gallery.map((img) => uploadToCloudinary(img, "trainings/gallery"));
        galleryImages = await Promise.all(uploadPromises);
    }

    // শুধুমাত্র প্রোভাইড করা ডাটা দিয়ে অবজেক্ট তৈরি
    const updateData: any = { ...payload };
    
    if (bannerImage) {
        updateData.bannerImage = bannerImage;
    }
    
    if (galleryImages) {
        updateData.galleryImages = galleryImages;
    }

    // undefined ফিল্ডগুলো ডিলিট করা
    Object.keys(updateData).forEach(key => 
        updateData[key] === undefined && delete updateData[key]
    );

    return await Training.findByIdAndUpdate(id, updateData, { new: true })
        .populate("course", "name")
        .populate("category", "name");
};

const deleteTraining = async (id: string) => {
    return await Training.findByIdAndDelete(id);
};

export const TrainingService = {
    createTrainingIntoDB,
    getAllTrainings,
    getTrainingById,
    updateTraining,
    deleteTraining,
    uploadToCloudinary 
};