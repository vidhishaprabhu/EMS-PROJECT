const mongoose = require("mongoose");
const leaveSchema = mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  fromDate: {
    type: Date,
    required: true,
  },
  toDate: {
    type: Date,
    required: true,
  },
  leaveType: {
    type: String,
    enum: ["Sick Leave", "Casual Leave", "Privilege Leave", "Unpaid Leave"],
    required: true,
  },

  appliedAt: {
    type: Date,
    default: Date.now,
  },
  reason: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },
});
const Leave = mongoose.model("Leave", leaveSchema);
module.exports = Leave;
