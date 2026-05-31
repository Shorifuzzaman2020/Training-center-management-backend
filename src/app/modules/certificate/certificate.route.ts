
import express from "express";
import { downloadCertificate, verifyEligibility } from "./certificate.controller"; 

const router = express.Router();


router.get("/certificate/verify/:nidNumber", verifyEligibility);

router.get("/certificate/:nidNumber", downloadCertificate);

export const CertificateRoutes = router;