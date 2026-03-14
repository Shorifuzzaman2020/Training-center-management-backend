// import { IBanner } from "./banner.interface";
// import { Banner } from "./banner.model";
// import axios from "axios";
// import FormData from "form-data";

// const createBannerIntoDB = async (
//     payload: { heading: string; subHeading: string },
//     file: Express.Multer.File
// ) => {
//     // convert image to base64
//     const base64Image = file.buffer.toString("base64");

//     const formData = new FormData();
//     formData.append("image", base64Image);

//     // upload to imgbb
//     const imgbbResponse = await axios.post(
//         `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`,
//         formData,
//         {
//             headers: formData.getHeaders(),
//         }
//     );

//     const imageUrl = imgbbResponse.data.data.display_url;

//     // save to DB
//     const result = await Banner.create({
//         heading: payload.heading,
//         subHeading: payload.subHeading,
//         imageUrl,
//     });

//     return result;
// };

// const getAllBanners = async () => {
//     return await Banner.find().sort({ createdAt: -1 });
// };

// const updateBannerIntoDB = async (
//     id: string,
//     payload: { heading?: string; subHeading?: string },
//     file?: Express.Multer.File
// ) => {
//     let imageUrl: string | undefined;

//     if (file) {
//         const base64Image = file.buffer.toString("base64");

//         const formData = new FormData();
//         formData.append("image", base64Image);

//         const imgbbResponse = await axios.post(
//             `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`,
//             formData,
//             {
//                 headers: formData.getHeaders(),
//             }
//         );

//         imageUrl = imgbbResponse.data.data.display_url;
//     }

//     const updateData: Partial<IBanner> = {
//         ...payload,
//     };

//     if (imageUrl) {
//         updateData.imageUrl = imageUrl;
//     }

//     const result = await Banner.findByIdAndUpdate(id, updateData, {
//         new: true,
//     });

//     return result;
// };

// const deleteBannerFromDB = async (id: string) => {
//     const deletedBanner = await Banner.findByIdAndDelete(id);

//     if (!deletedBanner) {
//         throw new Error("Banner not found or already deleted");
//     }

//     return deletedBanner;
// };

// export const BannerService = {
//     createBannerIntoDB,
//     getAllBanners,
//     updateBannerIntoDB,
//     deleteBannerFromDB,
// };


import { IBanner } from "./banner.interface";
import { Banner } from "./banner.model";
import cloudinary from "../../config/cloudinary";

const createBannerIntoDB = async (
    payload: { heading: string; subHeading: string },
    file?: Express.Multer.File
) => {
    let imageUrl = "";

    if (file && file.buffer) {
        const base64File = file.buffer.toString("base64");

        const uploadResponse = await cloudinary.uploader.upload(
            `data:${file.mimetype};base64,${base64File}`,
            {
                folder: "banners",
                resource_type: "auto",
            }
        );

        imageUrl = uploadResponse.secure_url;
    }

    const result = await Banner.create({
        heading: payload.heading,
        subHeading: payload.subHeading,
        imageUrl,
    });

    return result;
};

const getAllBanners = async () => {
    return Banner.find().sort({ createdAt: -1 });
};

const updateBannerIntoDB = async (
    id: string,
    payload: { heading?: string; subHeading?: string },
    file?: Express.Multer.File
) => {
    let imageUrl: string | undefined;

    if (file && file.buffer) {
        const base64File = file.buffer.toString("base64");

        const uploadResponse = await cloudinary.uploader.upload(
            `data:${file.mimetype};base64,${base64File}`,
            {
                folder: "banners",
                resource_type: "auto",
            }
        );

        imageUrl = uploadResponse.secure_url;
    }

    const updateData: Partial<IBanner> = {
        ...payload,
    };

    if (imageUrl) {
        updateData.imageUrl = imageUrl;
    }

    const result = await Banner.findByIdAndUpdate(id, updateData, {
        new: true,
    });

    return result;
};

const deleteBannerFromDB = async (id: string) => {
    const deletedBanner = await Banner.findByIdAndDelete(id);

    if (!deletedBanner) {
        throw new Error("Banner not found or already deleted");
    }

    return deletedBanner;
};

export const BannerService = {
    createBannerIntoDB,
    getAllBanners,
    updateBannerIntoDB,
    deleteBannerFromDB,
};