import express from "express";
import { SalaryController } from "./salary.controller";

const router = express.Router();

router.post("/generate", SalaryController.generateSalary);

export default router;