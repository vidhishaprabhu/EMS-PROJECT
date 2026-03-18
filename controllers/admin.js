const Admin = require("../models/Admin");
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
