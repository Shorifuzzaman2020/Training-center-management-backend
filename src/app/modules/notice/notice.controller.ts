import { Request, Response } from "express";
import { NoticeService } from "./notice.service";

const createNotice = async (req: Request, res: Response) => {

    try {

        const file = req.file;

        const result = await NoticeService.createNoticeIntoDB(
            req.body,
            file
        );

        res.status(201).json({
            success: true,
            message: "Notice published successfully",
            data: result,
        });

    } catch (error: any) {

        res.status(400).json({
            success: false,
            message: error.message,
        });

    }
};

const getNotices = async (req: Request, res: Response) => {

    const result = await NoticeService.getAllNotices();

    res.status(200).json({
        success: true,
        data: result,
    });

};

const updateNotice = async (req: Request, res: Response) => {

    const id = req.params.id as string;

    const result = await NoticeService.updateNotice(
        id,
        req.body
    );

    res.status(200).json({
        success: true,
        message: "Notice updated",
        data: result,
    });

};

const deleteNotice = async (req: Request, res: Response) => {

    const id = req.params.id as string;

    await NoticeService.deleteNotice(id);

    res.status(200).json({
        success: true,
        message: "Notice deleted",
    });

};

export const NoticeController = {
    createNotice,
    getNotices,
    updateNotice,
    deleteNotice,
};