// import express from "express";
// import { InstructorController } from "./instructor.controller";

// const router = express.Router();

// router.get("/students", InstructorController.getStudents);

// router.post("/attendance", InstructorController.markAttendance);

// router.get("/attendance-by-date", InstructorController.getAttendanceByDate);

// router.post("/marks", InstructorController.submitMarks);

// // router.get("/report/:id", InstructorController.getStudentReport);

// export default router;


import express from "express";
import * as ctrl from "./instructor.controller";

const router = express.Router();

router.get("/students", ctrl.getStudents);
router.get("/attendance", ctrl.getAttendanceByDate);
router.post("/attendance", ctrl.markAttendance);

router.get("/marks", ctrl.getMarks);
router.post("/marks", ctrl.submitMarks);

export default router;