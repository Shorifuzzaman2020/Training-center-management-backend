// import { Student } from "../students/students.model";
// import { StudentAttendance, Result } from "./instructor.model";

// /* GET STUDENTS */
// const getStudents = async () => {
//   return Student.find().populate("course batch");
// };

// /* ATTENDANCE SAVE */
// const markAttendance = async (payload: any[]) => {
//   const ops = payload.map((item) => ({
//     updateOne: {
//       filter: {
//         student: item.student,
//         date: new Date(item.date),
//       },
//       update: {
//         $set: {
//           status: item.status,
//           instructor: item.instructor,
//         },
//       },
//       upsert: true,
//     },
//   }));

//   return StudentAttendance.bulkWrite(ops);
// };

// /* GET ATTENDANCE BY DATE */
// const getAttendanceByDate = async (date: string) => {
//   return StudentAttendance.find({
//     date: new Date(date),
//   }).populate("student");
// };

// /* GRADE LOGIC */
// const calculateGrade = (marks: number) => {
//   if (marks >= 80) return "A+";
//   if (marks >= 70) return "A";
//   if (marks >= 60) return "B";
//   if (marks >= 50) return "C";
//   return "F";
// };

// /* SUBMIT MARKS */
// const submitMarks = async (payload: any[]) => {
//   const ops = payload.map((item) => {
//     const grade = calculateGrade(item.marks);

//     return {
//       updateOne: {
//         filter: {
//           student: item.student,
//           examType: item.examType,
//         },
//         update: {
//           $set: {
//             marks: item.marks,
//             grade,
//             instructor: item.instructor,
//           },
//         },
//         upsert: true,
//       },
//     };
//   });

//   return Result.bulkWrite(ops);
// };

// /* STUDENT REPORT */
// const getStudentReport = async (id: string) => {
//   const attendance = await StudentAttendance.find({ student: id });
//   const marks = await Result.find({ student: id });

//   return { attendance, marks };
// };

// export const InstructorService = {
//   getStudents,
//   markAttendance,
//   getAttendanceByDate,
//   submitMarks,
//   getStudentReport,
// };


// import { Admission } from "../admission/admission.model";
// import { StudentAttendance, Result } from "./instructor.model";

// /* GET STUDENTS (FROM ADMISSION) */
// const getStudents = async () => {
//   return Admission.find({
//     feeStatus: "paid", // ✅ only confirmed students
//   })
//     .populate("course")
//     .populate("preferredBatch");
// };

// /* ATTENDANCE */
// const markAttendance = async (payload: any[]) => {
//   const ops = payload.map((item) => ({
//     updateOne: {
//       filter: {
//         student: item.student, // admission ID
//         date: new Date(item.date),
//       },
//       update: {
//         $set: {
//           status: item.status,
//           instructor: item.instructor,
//         },
//       },
//       upsert: true,
//     },
//   }));

//   return StudentAttendance.bulkWrite(ops);
// };

// /* GET ATTENDANCE */
// const getAttendanceByDate = async (date: string) => {
//   return StudentAttendance.find({
//     date: new Date(date),
//   }).populate("student"); // 🔥 admission data আসবে
// };

// /* MARKS */
// const calculateGrade = (marks: number) => {
//   if (marks >= 80) return "A+";
//   if (marks >= 70) return "A";
//   if (marks >= 60) return "B";
//   if (marks >= 50) return "C";
//   return "F";
// };

// const submitMarks = async (payload: any[]) => {
//   const ops = payload.map((item) => {
//     const grade = calculateGrade(item.marks);

//     return {
//       updateOne: {
//         filter: {
//           student: item.student,
//           examType: item.examType,
//         },
//         update: {
//           $set: {
//             marks: item.marks,
//             grade,
//             instructor: item.instructor,
//           },
//         },
//         upsert: true,
//       },
//     };
//   });

//   return Result.bulkWrite(ops);
// };

// /* REPORT */
// const getStudentReport = async (id: string) => {
//   const attendance = await StudentAttendance.find({ student: id });
//   const marks = await Result.find({ student: id });

//   return { attendance, marks };
// };

// export const InstructorService = {
//   getStudents,
//   markAttendance,
//   getAttendanceByDate,
//   submitMarks,
//   getStudentReport,
// };

import { Admission } from "../admission/admission.model";
import { AssignTrainer, StudentAttendance, Result } from "./instructor.model";
import { Types } from "mongoose";

/* ✅ GET STUDENTS */
const getStudents = async (instructorId: string) => {
  const assigned = await AssignTrainer.find({
    trainer: instructorId,
  });

  const batchIds: Types.ObjectId[] = assigned
    .map((a) => a.batch)
    .filter((id): id is Types.ObjectId => id != null);

  if (!batchIds.length) return [];

  return Admission.find({
    preferredBatch: { $in: batchIds },
    feeStatus: "paid",
  });
};

/* ✅ ATTENDANCE BY DATE */
const getAttendanceByDate = async (date: string) => {
  return StudentAttendance.find({
    date: new Date(date),
  });
};

/* ✅ SAVE ATTENDANCE (NO DUPLICATE) */
const markAttendance = async (payload: any[]) => {
  const ops = payload.map((item) => ({
    updateOne: {
      filter: {
        student: item.student,
        date: new Date(item.date),
      },
      update: {
        $set: {
          status: item.status,
        },
      },
      upsert: true,
    },
  }));

  return StudentAttendance.bulkWrite(ops);
};

/* ✅ GET MARKS */
const getMarks = async (examType: string) => {
  return Result.find({ examType }).populate("student");
};

/* ✅ SUBMIT MARKS (LOCK SYSTEM) */
const submitMarks = async (payload: any[]) => {
  const ops = [];

  for (const item of payload) {
    const existing = await Result.findOne({
      student: item.student,
      examType: item.examType,
    });

    if (existing?.isLocked) continue;

    const grade =
      item.marks >= 80
        ? "A+"
        : item.marks >= 60
        ? "A"
        : item.marks >= 50
        ? "B"
        : "F";

    ops.push({
      updateOne: {
        filter: {
          student: item.student,
          examType: item.examType,
        },
        update: {
          $set: {
            marks: item.marks,
            grade,
            isLocked: true,
          },
        },
        upsert: true,
      },
    });
  }

  return Result.bulkWrite(ops);
};

export const InstructorService = {
  getStudents,
  getAttendanceByDate,
  markAttendance,
  getMarks,
  submitMarks,
};