import express from "express";
import { getMyResults } from "./result.controller";

const router = express.Router();

router.get("/results", getMyResults);

export default router;