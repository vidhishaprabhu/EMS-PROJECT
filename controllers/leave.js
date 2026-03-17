const Leave = require("../models/Leave");
exports.createLeave = async (req, res) => {
  try {
    const { employee, fromDate, toDate, reason, status } = req.body;
    if (!employee || !fromDate || !toDate || !reason) {
      return res.status(400).json({ message: "All fields are required" });
    } else {
      const leave = new Leave({
        employee: employee,
        fromDate: fromDate,
        toDate: toDate,
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
    const leave = await Leave.find();
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
exports.getLeaveById = async (req, res) => {
  try {
    const leave = await Leave.findOne({employee:req.user.id});
    if (!leave) {
      return res.status(404).json({ message: "Leave not found" });
    } else {
      return res
        .status(200)
        .json({ message: `Leave fetched successfully` ,leave:leave});
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
exports.updateLeave=async(req,res)=>{
  try{
    const id=req.params.id;
    const { employee, fromDate, toDate, reason, status } = req.body;
    if (!employee || !fromDate || !toDate || !reason) {
      return res.status(400).json({ message: "All fields are required" });
    }
    else{
      const leave=await Leave.findByIdAndUpdate(id,{employee, fromDate, toDate, reason, status},{new:true});
      if(!leave){
        return res.status(404).json({ message: "Leave not found" });
      }
      else{
         return res
        .status(200)
        .json({ message: `Leave with ${id} updated successfully`,leave:leave });
      }
    }


  }
  catch(error){
    return res.status(500).json({ message: "Internal server error" });
  }
}
exports.deleteLeave=async(req,res)=>{
  try{
    const id=req.params.id;
    const leave=await Leave.findByIdAndDelete(id);
    if(!leave){
      return res.status(404).json({ message: "Leave not found" });
    }
    else{
      return res
        .status(200)
        .json({ message: `Leave with ${id} deleted successfully`,leave:leave });
    }
  }
  catch(error){
    return res.status(500).json({ message: "Internal server error" });
  }
}