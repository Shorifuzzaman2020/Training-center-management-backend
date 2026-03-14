// import express from "express";
// import multer from "multer";
// import { NoticeController } from "./notice.controller";

// const router = express.Router();

// const storage = multer.memoryStorage();
// const upload = multer({ storage });

// router.post(
//     "/create-notice",
//     upload.single("file"),
//     NoticeController.createNotice
// );

// router.get("/", NoticeController.getNotices);

// router.patch("/:id", NoticeController.updateNotice);

// router.delete("/:id", NoticeController.deleteNotice);

// export default router;

import express from "express";
import multer from "multer";
import { NoticeController } from "./notice.controller";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post(
    "/create-notice",
    upload.single("file"),
    NoticeController.createNotice
);

router.get("/", NoticeController.getNotices);

router.patch("/:id", NoticeController.updateNotice);

router.delete("/:id", NoticeController.deleteNotice);

export default router;