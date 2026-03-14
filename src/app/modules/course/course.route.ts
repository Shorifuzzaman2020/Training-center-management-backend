import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { CourseController } from "./course.controller";
import { CourseValidation } from "./course.validation";

const router = express.Router();

router.post(
    "/create-course",
    validateRequest(CourseValidation.createCourseValidationSchema),
    CourseController.createCourse
);

router.get("/", CourseController.getCourses);
router.get("/:id", CourseController.getCourseById);
router.patch(
    "/:id",
    validateRequest(CourseValidation.updateCourseValidationSchema),
    CourseController.updateCourse
);

router.delete("/:id", CourseController.removeCourse);

export default router;