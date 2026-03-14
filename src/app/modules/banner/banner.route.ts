import express from "express";
import { BannerController } from "./banner.controller";
import multer from "multer";

const router = express.Router();

// memory storage (needed for imgbb)
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post(
    "/create-banner",
    upload.single("image"),
    BannerController.createBanner
);

router.get("/", BannerController.getBanners);
router.get("/:id", BannerController.getBannerById);
router.patch("/:id", upload.single("image"),BannerController.updateBanner);
router.delete("/:id", BannerController.deleteBanner);

// router.post("/create-banner", upload.single("image"), BannerController.createBanner);
// router.get("/", BannerController.getBanners);
export default router;