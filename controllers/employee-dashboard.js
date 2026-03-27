const Employee = require("../models/Employee");
const Leave = require("../models/Leave");
const Salary=require("../models/Salary")
const mongoose=require('mongoose')
exports.getEmployeeKpi = async (req, res) => {
  try {
    const employeeId = req.user.id;
    console.log("Employee ID:", employeeId);
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const firstDayOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

    const leavesThisMonth = await Leave.find({
      employee: employeeId,
      fromDate: { $lt: firstDayOfNextMonth },
      toDate: { $gte: firstDayOfMonth },
    });

    const totalLeaves = leavesThisMonth.length;
    const pendingLeaves = leavesThisMonth.filter(l => l.status === "Pending").length;
    const approvedLeaves = leavesThisMonth.filter(l => l.status === "Approved").length;
    const rejectedLeaves = leavesThisMonth.filter(l => l.status === "Rejected").length;

    const salaryResult = await Salary.aggregate([
      {
        $match: {
          employee: new mongoose.Types.ObjectId(employeeId),
          createdAt: { $gte: firstDayOfMonth, $lt: firstDayOfNextMonth },
        },
      },
      {
        $group: {
          _id: null,
          totalSalary: { $sum: "$total" },
        },
      },
    ]);

    const totalSalary = salaryResult[0]?.totalSalary || 0;

    return res.status(200).json({
      totalLeaves,
      pendingLeaves,
      approvedLeaves,
      rejectedLeaves,
      totalSalary,
    });
  } catch (error) {
    console.error("KPI Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.totalLeaveBalance = async (req, res) => {
  try {
    const employeeId = req.user.id;

    const employee = await Employee.findById(employeeId);

    const sickTaken = await Leave.countDocuments({
      employee: employeeId,
      leaveType: 'Sick Leave'
    });

    const casualTaken = await Leave.countDocuments({
      employee: employeeId,
      leaveType: 'Casual Leave'
    });

    const privilegeTaken = await Leave.countDocuments({
      employee: employeeId,
      leaveType: 'Privilege Leave'
    });

    const unpaidTaken = await Leave.countDocuments({
      employee: employeeId,
      leaveType: 'Unpaid Leave'
    });

    const totalSick = employee.leaveBalance.sick;
    console.log("Total Sick",totalSick)
    const totalCasual = employee.leaveBalance.casual;
    const totalPrivilege = employee.leaveBalance.privilege;
    const totalUnpaid = employee.leaveBalance.unpaid;

    return res.status(200).json({
      sick: {
        taken: sickTaken,
        total: totalSick,
        balance: totalSick - sickTaken
      },
      casual: {
        taken: casualTaken,
        total: totalCasual,
        balance: totalCasual - casualTaken
      },
      privilege: {
        taken: privilegeTaken,
        total: totalPrivilege,
        balance: totalPrivilege - privilegeTaken
      },
      unpaid: {
        taken: unpaidTaken,
        total: totalUnpaid,
        balance: totalUnpaid - unpaidTaken
      }
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};