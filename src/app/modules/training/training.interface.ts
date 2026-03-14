import { Types } from "mongoose";

export interface ITraining {
    course: Types.ObjectId;
    category: Types.ObjectId;

    shortDescription: string;
    longDescription: string;

    bannerImage: string;
    galleryImages: string[];

    facilities: string[];
}