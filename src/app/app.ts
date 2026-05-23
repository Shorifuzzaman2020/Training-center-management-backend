
import express from "express";
import cors from "cors";
import employeeRoutes from "./modules/employee/employee.route";
import bannerRoutes from "./modules/banner/banner.route"
import roleRoutes from "./modules/role/role.route"
import courseRoutes from "./modules/course/course.route"
import batchRoutes from "./modules/batch/batch.route"
import categoryRoutes from "./modules/category/category.route"
import assignTrainerRoutes from "./modules/assignTrainer/assignTrainer.route"
import trainingRoutes from "./modules/training/training.route"
import noticeRoutes from "./modules/notice/notice.route";
import blogRoutes from "./modules/blog/blog.route"
import admissionRoutes from "./modules/admission/admission.route"
import attendanceRoutes from "./modules/attendance/attendance.route"
import salaryRoutes from "./modules/salary/salary.route"
import InstructorRoutes from "./modules/instructor/instructor.route";
import { CertificateRoutes } from "./modules/certificate/certificate.route";
import { PaymentRoutes } from "./modules/payment/payment.route";
import ResultRoutes from "./modules/result/result.route";
import FinanceRoutes from "./modules/finance/finance.route";
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/v1/employees", employeeRoutes);
app.use("/api/v1/banners", bannerRoutes);
app.use("/api/v1/roles", roleRoutes);
app.use("/api/v1/courses", courseRoutes);
app.use("/api/v1/batches", batchRoutes);
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/assign-trainer", assignTrainerRoutes);
app.use("/api/v1/trainings", trainingRoutes);
app.use("/api/v1/notices", noticeRoutes);
app.use("/api/v1/blogs", blogRoutes);
app.use("/api/v1/admissions", admissionRoutes);
app.use("/api/v1/attendance", attendanceRoutes);
app.use("/api/v1/salary", salaryRoutes);
app.use("/api/v1/instructor", InstructorRoutes);
app.use("/api/v1", CertificateRoutes);
app.use("/api/v1", PaymentRoutes);
app.use("/api/v1/student", ResultRoutes);
app.use("/api/v1/finance", FinanceRoutes);
export default app;