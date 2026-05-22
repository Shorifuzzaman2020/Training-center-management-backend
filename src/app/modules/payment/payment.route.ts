import express from "express";
import { createPayment } from "./payment.controller";
import { paymentSuccess } from "./payment.controller";
const router = express.Router();

router.post("/payment/init", createPayment);
router.post("/payment/success", paymentSuccess);

export const PaymentRoutes = router;