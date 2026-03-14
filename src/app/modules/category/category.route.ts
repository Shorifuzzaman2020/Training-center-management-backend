import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { CategoryController } from "./category.controller";
import { CategoryValidation } from "./category.validation";
import multer from "multer";
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });
router.post(
    "/create-category",
    upload.single("icon"),
    validateRequest(CategoryValidation.createCategoryValidationSchema),
    CategoryController.createCategory
);

router.get("/", CategoryController.getAllCategories);
router.get("/:id", CategoryController.getCategoryById);
router.patch(
    "/:id",
    upload.single("icon"),
    validateRequest(CategoryValidation.updateCategoryValidationSchema),
    CategoryController.updateCategory
);

router.delete("/:id", CategoryController.removeCategory);

export default router;