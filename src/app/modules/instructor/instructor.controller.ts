// import { Request, Response } from "express";
// import { InstructorService } from "./instructor.service";
// import { Admission } from "../admission/admission.model";

// /* GET STUDENTS */
// // const getStudents = async (req: Request, res: Response) => {
// //   const data = await InstructorService.getStudents();

// //   res.status(200).json({
// //     success: true,
// //     data,
// //   });
// // };

// export const getStudents = async (req: Request, res: Response) => {
//   try {
//     const { instructorId } = req.query;

//     const data = await InstructorService.getStudents(
//       instructorId as string
//     );

//     res.json({ success: true, data });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({
//       success: false,
//       message: "Failed to load students",
//     });
//   }
// };

// /* ATTENDANCE */
// const markAttendance = async (req: Request, res: Response) => {
//   const result = await InstructorService.markAttendance(req.body);

//   res.status(200).json({
//     success: true,
//     message: "Attendance Saved",
//     data: result,
//   });
// };

// /* GET BY DATE */
// const getAttendanceByDate = async (req: Request, res: Response) => {
//   const { date } = req.query;

//   const data = await InstructorService.getAttendanceByDate(date as string);

//   res.status(200).json({
//     success: true,
//     data,
//   });
// };

// /* MARKS */
// const submitMarks = async (req: Request, res: Response) => {
//   const result = await InstructorService.submitMarks(req.body);

//   res.status(200).json({
//     success: true,
//     message: "Marks Submitted",
//     data: result,
//   });
// };

// /* REPORT */
// // const getStudentReport = async (req: Request, res: Response) => {
// //   const data = await InstructorService.getStudentReport(req.params.id as string);

// //   res.status(200).json({
// //     success: true,
// //     data,
// //   });
// // };

// export const InstructorController = {
//   getStudents,
//   markAttendance,
//   getAttendanceByDate,
//   submitMarks,
// //   getStudentReport,
// };


import { Request, Response } from "express";
import { InstructorService } from "./instructor.service";
import { Admission } from "../admission/admission.model";
import { Result } from "./instructor.model";
export const getStudents = async (req: Request, res: Response) => {
  try {
    const { instructorId } = req.query;
    const data = await InstructorService.getStudents(
      instructorId as string
    );
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false });
  }
};

export const getAttendanceByDate = async (req: Request, res: Response) => {
  const { date } = req.query;
  const data = await InstructorService.getAttendanceByDate(date as string);
  res.json({ data });
};

export const markAttendance = async (req: Request, res: Response) => {
  const data = await InstructorService.markAttendance(req.body);
  res.json({ success: true });
};

export const getMarks = async (req: Request, res: Response) => {
  const { examType } = req.query;
  const data = await InstructorService.getMarks(examType as string);
  res.json({ data });
};

export const submitMarks = async (req: Request, res: Response) => {
  await InstructorService.submitMarks(req.body);
  res.json({ success: true });
};

export const getMyResults = async (req: Request, res: Response) => {
  try {
    const { email } = req.query;

    const student = await Admission.findOne({ email });

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    const results = await Result.find({
      student: student._id,
    });

    res.json({
      success: true,
      data: results,
    });

  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch results",
    });
  }
};