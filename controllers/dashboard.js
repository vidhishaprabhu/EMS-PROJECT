const Employee = require("../models/Employee");
const Department = require("../models/Department");
const Leave = require("../models/Leave");
const Salary = require("../models/Salary");

exports.adminDashboard = async (req, res) => {
  try {
    const totalEmp = await Employee.countDocuments();
    const totalDept = await Department.countDocuments();
    const totalLeaves = await Leave.countDocuments();
    const totalPendingLeaves = await Leave.countDocuments({
      status: "Pending",
    });
    const totalSalary = await Salary.countDocuments();

    return res.status(200).json({
      totalEmp,
      totalDept,
      totalLeaves,
      totalPendingLeaves,
      totalSalary,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server error" });
  }
};
exports.employeeDashboard = async (req, res) => {
  try {
    const totalLeaves = await Leave.countDocuments({ employee: req.user.id });
    const salary = await Salary.countDocuments({ employee: req.user.id });
    const pendingLeaves = await Leave.countDocuments({
      employee: req.user.id,
      status: "Pending",
    });
    return res.status(200).json({ totalLeaves, salary, pendingLeaves });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server error" });
  }
};
