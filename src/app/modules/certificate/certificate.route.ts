import express from "express";
import { downloadCertificate } from "./certificate.controller";

const router = express.Router();

router.get("/certificate/:nidNumber", downloadCertificate);

export const CertificateRoutes = router;