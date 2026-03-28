const Admin = require("../models/Admin");
const Employee=require("../models/Employee")
const bcrypt = require("bcrypt");
const jwt=require('jsonwebtoken')
exports.createAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    } else {
      const hashpassword = await bcrypt.hash(password, 10);
      const admin = new Admin({
        name: name,
        email: email,
        password: hashpassword,
      });
      admin.save();
      return res
        .status(200)
        .json({ message: "Admin created successfully", admin: admin });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
exports.changePasswordAdmin = async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;
    if (!currentPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (newPassword !== confirmPassword) {
      return res
        .status(400)
        .json({ message: "New password and confirm password do not match" });
    }

    if (newPassword.length < 6) {
      return res
        .status(400)
        .json({ message: "New password must be at least 6 characters" });
    }

    const adminId = req.user.id;

    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res
        .status(404)
        .json({ message: `Admin with ${adminId} not found` }); 
    }

    const isMatch = await bcrypt.compare(currentPassword, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" }); 400
    }

    admin.password = await bcrypt.hash(newPassword, 10);
    await admin.save();

    return res.status(200).json({ message: "Password changed successfully",admin:admin });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.addBankDetails=async(req,res)=>{
  try{
    const employeeId=req.params.id;
    const { accountNumber, bankName, ifscCode, branch } = req.body;
    const employee=await Employee.findById(employeeId)
    if(!employee){
      return res.status(404).json({message:'Employee not found'});
    }
    employee.bankDetails={
      accountNumber:accountNumber,
      bankName:bankName,
      ifscCode:ifscCode,
      branch:branch
    }
    employee.save()
    return res.status(200).json({message:'Bank details added successfully',employee:employee})
  }
  catch(error){
    return res.status(500).json({ message: "Internal server error" });
  }
}