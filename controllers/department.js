const Department = require("../models/Department");

exports.createDepartment = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Name feild is required" });
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
exports.getById = async (req, res) => {
  try {
    const id = req.params.id;
    const department = await Department.findById(id);
    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    } else {
      return res
        .status(200)
        .json({
          message: `Department with ${id} fetched successfully`,
          department: department,
        });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal Server error" });
  }
};
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
