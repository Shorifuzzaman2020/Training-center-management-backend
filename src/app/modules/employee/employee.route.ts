// import express from "express";
// import { EmployeeController } from "./employee.controller";
// import { upload } from "../../utils/fileUploader";

// const router = express.Router();

// router.post(
//     "/create-employee",
//     upload.single("photo"),
//     EmployeeController.createEmployee
// );

// export default router;

import express from "express";
import { EmployeeController } from "./employee.controller";
import validateRequest from "../../middlewares/validateRequest";
import { EmployeeValidation } from "./employee.validation";
import multer from "multer";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post(
    "/create-employee",
    upload.single("photo"),
    validateRequest(EmployeeValidation.createEmployeeValidationSchema),
    EmployeeController.createEmployee
);
router.get("/", EmployeeController.getAllEmployees);
router.get("/:id", EmployeeController.getEmployeeById);
router.patch(
    "/:id",
    upload.single("photo"),
    validateRequest(EmployeeValidation.updateEmployeeValidationSchema),
    EmployeeController.updateEmployee
);
router.delete("/:id", EmployeeController.deleteEmployee);

export default router;