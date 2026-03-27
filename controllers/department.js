const Department = require("../models/Department");
const Employee = require("../models/Employee");

exports.createDepartment = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name || !description) {
      return res.status(400).json({ message: "All feilds are required" });
    }
    const department = new Department({
      name: name,
      description: description,
    });
    department.save();
    return res.status(200).json({ message: "Department created successfully",department:department });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server error" });
  }
};
exports.getDepartment = async (req, res) => {
  try {
    const department = await Department.find();
    if(!department){
      return res.status(404).json({message:'No Department data found'})
    }
    return res.status(200).json({ department: department });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server error" });
  }
};
exports.getDeptInfo = async (req, res) => {
  try {
    
    const user = await Employee.findById(req.user.id);
    
    if (!user || !user.department) {
      return res.status(404).json({ message: "User or Department reference not found" });
    }

    const department = await Department.findById(user.department);

    if (!department) {
      return res.status(404).json({ message: "Department details not found" });
    }

    return res.status(200).json({
      message: "Department fetched successfully",
      department: department, // This will now be the { _id, name: 'IT', ... } object
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal Server error" });
  }
};
exports.getDepartmentById=async(req,res)=>{
  try{
    const id=req.params.id;
    const department=await Department.findById(id);
    if(!department){
      return res.status(404).json({message:`Department of id ${id} not found`})
    }
    return res.status(200).json({message:`Department of id ${id} fetched successfully`,department:department});

  }
  catch(error){
    return res.status(500).json({ message: "Internal Server error" });
  }
}
exports.updateDepartment = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, description } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Name feild is required" });
    }
    const department = await Department.findByIdAndUpdate(
      id,
      { name, description },
      { new: true },
    );
    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    } else {
      return res
        .status(200)
        .json({
          message: `Department with ${id} updated successfully`,
          department: department,
        });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal Server error" });
  }
};
exports.deleteDepartment = async (req, res) => {
  try {
    const id = req.params.id;
    const department = await Department.findByIdAndDelete(id);
    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    } else {
      return res
        .status(200)
        .json({ message: `Department with ${id} deleted successfully` });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal Server error" });
  }
};
