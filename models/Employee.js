const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },
    bankDetails: {
      accountNumber: { type: String },
      bankName: { type: String },
      ifscCode: { type: String },
      branch: { type: String },
    },
    leaveBalance: {
      sick: { type: Number, default: 10 },
      casual: { type: Number, default: 12 },
      privilege: { type: Number, default: 15 },
      unpaid: { type: Number, default: 0 },
    },
    position: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "employee",
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "other"],
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
const Employee = mongoose.model("Employee", employeeSchema);
module.exports = Employee;
