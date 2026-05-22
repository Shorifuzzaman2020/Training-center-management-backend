import { Request, Response } from "express";
import { initPayment } from "./payment.service";
import { Admission } from "../admission/admission.model";

// export const createPayment = async (req: Request, res: Response) => {
//   try {
//     const { courseId, amount } = req.body;

//     const data = await initPayment(courseId, amount);

//     res.json({
//       success: true,
//       url: data.url,
//     });
//   } catch (err) {
//     res.status(500).json({
//       message: "Payment init failed",
//     });
//   }
// };

export const createPayment = async (req: Request, res: Response) => {
  const { admissionId, amount, email } = req.body;

  const data = await initPayment(admissionId, amount, email);

  res.json({
    url: data.url,
  });
};

// export const paymentSuccess = async (req: Request, res: Response) => {
//   try {
//     const { tran_id, amount, value_a } = req.body;

//     const admissionId = value_a; // 🔥 we send this earlier

//     const admission = await Admission.findById(admissionId);

//     if (!admission) throw new Error("Admission not found");

//     // 🔥 UPDATE PAYMENT
//     admission.feeAmount += Number(amount);
//     admission.feeStatus = "paid";

//     if (!Array.isArray(admission.payments)) {
//       admission.payments = [];
//     }

//     admission.payments.push({
//       amount,
//       transactionId: tran_id,
//       date: new Date(),
//     });

//     await admission.save();

//     // 🔥 REDIRECT FRONTEND
//     res.redirect("http://localhost:3000/payment-success");

//   } catch (err) {
//     res.redirect("http://localhost:3000/payment-fail");
//   }
// };


export const paymentSuccess = async (req: Request, res: Response) => {
  try {
    const { tran_id, amount, value_a } = req.body;

    const admissionId = value_a;

    const admission = await Admission.findById(admissionId);

    if (!admission) throw new Error("Admission not found");

    // 🔥 UPDATE
    admission.feeAmount += Number(amount);
    admission.feeStatus = "paid";

    if (!Array.isArray(admission.payments)) {
      admission.payments = [];
    }

    admission.payments.push({
      amount,
      transactionId: tran_id,
      date: new Date(),
    });

    await admission.save();

    // 🔥 redirect frontend
    res.redirect("http://localhost:3000/student-dashboard/payment-history");

  } catch (err) {
    res.redirect("http://localhost:3000/payment-fail");
  }
};