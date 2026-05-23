// import express from "express";
// import { SalaryController } from "./salary.controller";

// const router = express.Router();

// router.post("/generate", SalaryController.generateSalary);


// export default router;

import express from "express";
import { SalaryController } from "./salary.controller";

const router = express.Router();

router.post("/generate", SalaryController.generateSalary);

/* 🔥 ADD THIS */
router.get("/slip/:id", SalaryController.downloadSlip);

export default router;