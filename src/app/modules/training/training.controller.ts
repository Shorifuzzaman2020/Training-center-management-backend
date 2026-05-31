// import { Request, Response } from "express";
// import { TrainingService } from "./training.service";
// import axios from "axios";
// import FormData from "form-data";
// const createTraining = async (req: Request, res: Response) => {
//     try {

//         const files = req.files as {
//             bannerImage?: Express.Multer.File[];
//             galleryImages?: Express.Multer.File[];
//         };

//         const banner = files?.bannerImage?.[0];
//         const gallery = files?.galleryImages || [];

//         const result = await TrainingService.createTrainingIntoDB(
//             req.body,
//             banner,
//             gallery
//         );

//         res.status(201).json({
//             success: true,
//             message: "Training created successfully",
//             data: result,
//         });

//     } catch (error: any) {
//         res.status(400).json({
//             success: false,
//             message: error.message,
//         });
//     }
// };

// const getTrainings = async (req: Request, res: Response) => {

//     const result = await TrainingService.getAllTrainings();

//     res.status(200).json({
//         success: true,
//         data: result,
//     });

// };

// const getTrainingById = async (req: Request, res: Response) => {
//     const id = req.params.id as string;
//     const result = await TrainingService.getAllTrainings();
//     const training = result.find((t) => t._id.toString() === id);

//     if (!training) {
//         return res.status(404).json({
//             success: false,
//             message: "Training not found",
//         });
//     }

//     res.status(200).json({
//         success: true,
//         data: training,
//     });

// };

// const uploadImage = async (file: Express.Multer.File): Promise<string> => {
//     const base64Image = file.buffer.toString("base64");

//     const formData = new FormData();
//     formData.append("image", base64Image);

//     const res = await axios.post(
//         `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`,
//         formData,
//         {
//             headers: formData.getHeaders(),
//         }
//     );

//     return res.data.data.display_url;
// };

// // const updateTraining = async (req: Request, res: Response) => {
// //     const id = req.params.id as string;
// //     const result = await TrainingService.getAllTrainings();
// //     const training = result.find((t) => t._id.toString() === id);

// //     if (!training) {
// //         return res.status(404).json({
// //             success: false,
// //             message: "Training not found",
// //         });
// //     }

// //     try {
// //         const files = req.files as {
// //             bannerImage?: Express.Multer.File[];
// //             galleryImages?: Express.Multer.File[];
// //         };

// //         const banner = files?.bannerImage?.[0];
// //         const gallery = files?.galleryImages || [];

// //         const updatedTraining = await TrainingService.updateTraining(
// //             id,
// //             req.body
// //         );

// //         res.status(200).json({
// //             success: true,
// //             message: "Training updated successfully",
// //             data: updatedTraining,
// //         });

// //     } catch (error: any) {
// //         res.status(400).json({
// //             success: false,
// //             message: error.message,
// //         });
// //     }
// // };

// const updateTraining = async (req: Request, res: Response) => {
//     try {
//         const id = req.params.id as string;
//         const files = req.files as {
//             bannerImage?: Express.Multer.File[];
//             galleryImages?: Express.Multer.File[];
//         };

//         const banner = files?.bannerImage?.[0];
//         const gallery = files?.galleryImages || [];

//         // Pass files separately like in createTraining
//         const updatedTraining = await TrainingService.updateTraining(
//             id,
//             req.body,
//             banner,
//             gallery
//         );

//         res.status(200).json({
//             success: true,
//             message: "Training updated successfully",
//             data: updatedTraining,
//         });

//     } catch (error: any) {
//         res.status(400).json({
//             success: false,
//             message: error.message,
//         });
//     }
// };

// const deleteTraining = async (req: Request, res: Response) => {
//     const id = req.params.id as string;
//     const result = await TrainingService.getAllTrainings();
//     const training = result.find((t) => t._id.toString() === id);

//     if (!training) {
//         return res.status(404).json({
//             success: false,
//             message: "Training not found",
//         });
//     }

//     try {
//         await TrainingService.deleteTraining(id);

//         res.status(200).json({
//             success: true,
//             message: "Training deleted successfully",
//         });

//     } catch (error: any) {
//         res.status(400).json({
//             success: false,
//             message: error.message,
//         });
//     }
// };

// const uploadTrainingImage = async (req: Request, res: Response) => {
//     try {
//         const file = req.file as Express.Multer.File;

//         if (!file) {
//             return res.status(400).json({
//                 success: false,
//                 message: "No file uploaded",
//             });
//         }

//         const imageUrl = await uploadImage(file);

//         res.status(200).json({
//             success: true,
//             message: "Image uploaded successfully",
//             data: { imageUrl },
//         });

//     } catch (error: any) {
//         res.status(500).json({
//             success: false,
//             message: "Image upload failed",
//             error: error.message,
//         });
//     }
// };

// export const TrainingController = {
//     createTraining,
//     getTrainings,
//     getTrainingById,
//     uploadTrainingImage,
//     uploadImage,
//     updateTraining,
//     deleteTraining,
// };

import { Request, Response } from "express";
import { TrainingService } from "./training.service";

const createTraining = async (req: Request, res: Response) => {
    try {
        const files = req.files as {
            bannerImage?: Express.Multer.File[];
            galleryImages?: Express.Multer.File[];
        };

        const banner = files?.bannerImage?.[0];
        const gallery = files?.galleryImages || [];

        const result = await TrainingService.createTrainingIntoDB(
            req.body,
            banner,
            gallery
        );

        res.status(201).json({
            success: true,
            message: "Training created successfully",
            data: result,
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

const getTrainings = async (req: Request, res: Response) => {
    try {
        const result = await TrainingService.getAllTrainings();
        res.status(200).json({
            success: true,
            data: result,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getTrainingById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        const training = await TrainingService.getTrainingById(id);

        if (!training) {
            return res.status(404).json({
                success: false,
                message: "Training not found",
            });
        }

        res.status(200).json({
            success: true,
            data: training,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const updateTraining = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        const files = req.files as {
            bannerImage?: Express.Multer.File[];
            galleryImages?: Express.Multer.File[];
        };

        const banner = files?.bannerImage?.[0];
        const gallery = files?.galleryImages || [];

        const updatedTraining = await TrainingService.updateTraining(
            id,
            req.body,
            banner,
            gallery
        );

        if (!updatedTraining) {
            return res.status(404).json({
                success: false,
                message: "Training not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Training updated successfully",
            data: updatedTraining,
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

const deleteTraining = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        const deletedTraining = await TrainingService.deleteTraining(id);

        if (!deletedTraining) {
            return res.status(404).json({
                success: false,
                message: "Training not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Training deleted successfully",
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

// আলাদাভাবে কোনো সিঙ্গেল ইমেজ আপলোড করার এন্ডপয়েন্ট
const uploadTrainingImage = async (req: Request, res: Response) => {
    try {
        const file = req.file as Express.Multer.File;

        if (!file) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded",
            });
        }

        // Cloudinary-তে আপলোড করা হচ্ছে
        const imageUrl = await TrainingService.uploadToCloudinary(file, "trainings/general");

        res.status(200).json({
            success: true,
            message: "Image uploaded successfully to Cloudinary",
            data: { imageUrl },
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Image upload failed",
            error: error.message,
        });
    }
};

export const TrainingController = {
    createTraining,
    getTrainings,
    getTrainingById,
    uploadTrainingImage,
    updateTraining,
    deleteTraining,
};