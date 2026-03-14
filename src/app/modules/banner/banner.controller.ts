import { Request, Response } from "express";
import { BannerService } from "./banner.service";

const createBanner = async (req: Request, res: Response) => {
    try {
        const { heading, subHeading } = req.body;

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Image is required",
            });
        }

        const result = await BannerService.createBannerIntoDB(
            { heading, subHeading },
            req.file
        );

        res.status(201).json({
            success: true,
            message: "Banner created successfully",
            data: result,
        });
    } catch (error: any) {
        console.log("IMG ERROR =>", error?.response?.data || error.message);

        res.status(500).json({
            success: false,
            message: "Banner upload failed",
            error: error?.response?.data || error.message,
        });
    }
};

const getBanners = async (req: Request, res: Response) => {
    const result = await BannerService.getAllBanners();

    res.status(200).json({
        success: true,
        count: result.length,
        data: result,
    });
};
const getBannerById = async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const result = await BannerService.getAllBanners();
    const banner = result.find((b) => b._id.toString() === id);

    if (!banner) {
        return res.status(404).json({
            success: false,
            message: "Banner not found",
        });
    }

    res.status(200).json({
        success: true,
        data: banner,
    });
}

const updateBanner = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        const { heading, subHeading } = req.body;

        const result = await BannerService.updateBannerIntoDB(
            id,
            { heading, subHeading },
            req.file
        );

        res.status(200).json({
            success: true,
            message: "Banner updated successfully",
            data: result,
        });

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Banner update failed",
            error: error.message,
        });
    }
};

const deleteBanner = async (req: Request, res: Response) => {
    try {
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

        const deleted = await BannerService.deleteBannerFromDB(id);

        res.status(200).json({
            success: true,
            message: "Banner deleted successfully",
            data: deleted,
        });
    } catch (error: any) {
        res.status(404).json({
            success: false,
            message: error.message || "Banner deletion failed",
        });
    }
};

export const BannerController = {
    createBanner,
    getBanners,
    getBannerById,
    updateBanner,
    deleteBanner,
};