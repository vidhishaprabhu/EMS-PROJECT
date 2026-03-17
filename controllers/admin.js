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
exports.loginAdmin=async(req,res)=>{
  try{
    const {email,password}=req.body;
    if(!email || !password){
      return res.status(400).json({message:'All fields are required'});
    }
    const existingAdmin=await Admin.findOne({email});
    if(!existingAdmin){
      return res.status(404).json({message:'Admin not found'});
    }
    const isMatch=await bcrypt.compare(password,existingAdmin.password);
    if(!isMatch){
      return res.status(404).json({message:'Password does not match'});
    }
    const token = jwt.sign({id:existingAdmin._id,name:existingAdmin.name,email:existingAdmin.email,role:existingAdmin.role},process.env.JWT_SECRET,{expiresIn:'1m'});

    return res.status(200).json({message:'Admin logged in successfully',token:token,user:{
      id:existingAdmin._id,
      name:existingAdmin.name,
      email:existingAdmin.email,
      role:existingAdmin.role
    }})

  }
  catch(error){
    return res.status(500).json({ message: "Internal server error" });
  }
}