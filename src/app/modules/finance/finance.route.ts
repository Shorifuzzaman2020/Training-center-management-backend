import express from "express";
import { getFinance, createExpense } from "./finance.controller";

const router = express.Router();

router.get("/", getFinance);
router.post("/expense", createExpense);

export default router;