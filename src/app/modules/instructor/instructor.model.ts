

// import { Schema, model } from "mongoose";

// /* ATTENDANCE */
// const attendanceSchema = new Schema(
//   {
//     student: {
//       type: Schema.Types.ObjectId,
//       ref: "Admission", // ✅ IMPORTANT
//       required: true,
//     },
//     date: {
//       type: Date,
//       required: true,
//     },
//     status: {
//       type: Number,
//       enum: [0, 1],
//       required: true,
//     },
//     instructor: {
//       type: Schema.Types.ObjectId,
//       ref: "User",
//     },
//   },
//   { timestamps: true }
// );

// export const StudentAttendance = model(
//   "StudentAttendance",
//   attendanceSchema
// );

// /* RESULT */
// // const resultSchema = new Schema(
// //   {
// //     student: {
// //       type: Schema.Types.ObjectId,
// //       ref: "Admission",
// //       required: true,
// //     },
// //     marks: Number,
// //     grade: String,
// //     examType: String,
// //     instructor: {
// //       type: Schema.Types.ObjectId,
// //       ref: "User",
// //     },
// //   },
// //   { timestamps: true }
// // );

// const resultSchema = new Schema(
//   {
//     student: {
//       type: Schema.Types.ObjectId,
//       ref: "Admission",
//       required: true,
//     },
//     marks: Number,
//     grade: String,
//     examType: String,
//     instructor: {
//       type: Schema.Types.ObjectId,
//       ref: "User",
//     },
//     isLocked: {
//       type: Boolean,
//       default: false, // 🔥 IMPORTANT
//     },
//   },
//   { timestamps: true }
// );
// export const Result = model("Result", resultSchema);

// const markSchema = new Schema(
//   {
//     student: {
//       type: Schema.Types.ObjectId,
//       ref: "Admission",
//     },
//     marks: Number,
//     examType: String,
//     instructor: String,
//   },
//   { timestamps: true }
// );

// export const Mark = model("Mark", markSchema);

// const assignTrainerSchema = new Schema(
//   {
//     trainer: {
//       type: Schema.Types.ObjectId,
//     },
//     batch: {
//       type: Schema.Types.ObjectId,
//     },
//     course: {
//       type: Schema.Types.ObjectId,
//     },
//   },
//   { timestamps: true }
// );

// export const AssignTrainer = model("AssignTrainer", assignTrainerSchema);


import mongoose, { Schema } from "mongoose";

/* ATTENDANCE */
const attendanceSchema = new Schema(
  {
    student: {
      type: Schema.Types.ObjectId,
      ref: "Admission",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    status: {
      type: Number,
      enum: [0, 1],
      required: true,
    },
    instructor: {
      type: Schema.Types.ObjectId,
    },
  },
  { timestamps: true }
);

export const StudentAttendance =
  mongoose.models.StudentAttendance ||
  mongoose.model("StudentAttendance", attendanceSchema);

/* RESULT */
const resultSchema = new Schema(
  {
    student: {
      type: Schema.Types.ObjectId,
      ref: "Admission",
      required: true,
    },
    marks: Number,
    grade: String,
    examType: String,
    instructor: {
      type: Schema.Types.ObjectId,
    },
    isLocked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Result =
  mongoose.models.Result || mongoose.model("Result", resultSchema);

/* MARK */
const markSchema = new Schema(
  {
    student: {
      type: Schema.Types.ObjectId,
      ref: "Admission",
    },
    marks: Number,
    examType: String,
    instructor: String,
  },
  { timestamps: true }
);

export const Mark =
  mongoose.models.Mark || mongoose.model("Mark", markSchema);

/* ASSIGN TRAINER */
const assignTrainerSchema = new Schema(
  {
    trainer: {
      type: Schema.Types.ObjectId,
    },
    batch: {
      type: Schema.Types.ObjectId,
    },
    course: {
      type: Schema.Types.ObjectId,
    },
  },
  { timestamps: true }
);

export const AssignTrainer =
  mongoose.models.AssignTrainer ||
  mongoose.model("AssignTrainer", assignTrainerSchema);