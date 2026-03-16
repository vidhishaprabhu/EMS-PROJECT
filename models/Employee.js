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
    },
    position: {
      type: String,
    },
    role: {
      type: String,
      default: "employee",
    },
    image: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);
const Employee = mongoose.model("Employee", employeeSchema);
module.exports = Employee;
