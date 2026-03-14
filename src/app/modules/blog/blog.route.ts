import express from "express";
import {BlogController} from "./blog.controller"
import multer from "multer";

const router = express.Router();

// memory storage (needed for imgbb)
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post(
    "/create-blog",
    upload.single("image"),
    BlogController.createBlog
);

router.get("/", BlogController.getBlogs);
router.get("/:id", BlogController.getSingleBlog);
export default router;