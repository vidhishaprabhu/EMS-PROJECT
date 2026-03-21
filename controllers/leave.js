const Leave = require("../models/Leave");
exports.createLeave = async (req, res) => {
  try {
    const { employee, fromDate, toDate, leaveType, reason, status } = req.body;
    if (!employee || !fromDate || !toDate || !leaveType || !reason) {
      return res.status(400).json({ message: "All fields are required" });
    } else {
      const leave = new Leave({
        employee: employee,
        fromDate: fromDate,
        toDate: toDate,
        leaveType: leaveType,
        reason: reason,
        status: status,
      });
      leave.save();
      return res
        .status(200)
        .json({ message: "Leave created successfully", leave: leave });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
exports.getLeave = async (req, res) => {
  try {
    const leave = await Leave.find()
    if (!leave) {
      return res.status(404).json({ message: "No Leave data found" });
    }
    return res
      .status(200)
      .json({ message: "Leave details fetched successfully", leave: leave });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
exports.getLeaveById=async(req,res)=>{
  try{
    const id=req.params.id;
    const leave=await Leave.findById(id).populate('employee','name image');
    if(!leave){
      return res.status(404).json({message:`Leave with ${id} not found`})
    }
    return res.status(200).json({message:`Leave with ${id} details fetched successfully`,leave:leave});
  }
  catch(error){
    return res.status(500).json({ message: "Internal server error" });
  }
}
exports.getLeaveInfo = async (req, res) => {
  try {
    const leave = await Leave.findOne({ employee: req.user.id });
    if (!leave) {
      return res.status(404).json({ message: "Leave not found" });
    } else {
      return res
        .status(200)
        .json({ message: `Leave fetched successfully`, leave: leave });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
exports.getLeaveByEmployeeId = async (req, res) => {
  try {
    const leave = await Leave.findOne({ employee: req.params.id }).populate(
      "employee",
      "name email",
    );

    if (!leave) {
      return res.status(404).json({ message: "Leave not found" });
    }

    return res.status(200).json({ leave: leave });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
exports.updateLeaveStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const leave = await Leave.findById(id).populate('employee', 'name email position image');;

    if (!leave) {
      return res.status(404).json({ message: `Leave not found` });
    }

    leave.status = status;
    await leave.save();

    return res.status(200).json({ message: 'Leave status updated successfully', leave:leave });

  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).json({ message: error.message });
  }
};
exports.updateLeave = async (req, res) => {
  try {
    const id = req.params.id;
    const { employee, fromDate, toDate, leaveType, reason, status } = req.body;
    if (!employee || !fromDate || !toDate || !leaveType || !reason) {
      return res.status(400).json({ message: "All fields are required" });
    } else {
      const leave = await Leave.findByIdAndUpdate(
        id,
        { employee, fromDate, toDate, reason, status },
        { new: true },
      );
      if (!leave) {
        return res.status(404).json({ message: "Leave not found" });
      } else {
        return res.status(200).json({
          message: `Leave with ${id} updated successfully`,
          leave: leave,
        });
      }
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
exports.deleteLeave = async (req, res) => {
  try {
    const id = req.params.id;
    const leave = await Leave.findByIdAndDelete(id);
    if (!leave) {
      return res.status(404).json({ message: "Leave not found" });
    } else {
      return res.status(200).json({
        message: `Leave with ${id} deleted successfully`,
        leave: leave,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
