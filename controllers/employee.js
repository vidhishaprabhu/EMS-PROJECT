const Employee = require("../models/Employee");

exports.createEmployee = async (req, res) => {
  try {
    const { name, email, password, department, position, role, image } =
      req.body;
    if (
      !name ||
      !email ||
      !password ||
      !department ||
      !position ||
      !role ||
      !image
    ) {
      return res.status(400).json({ message: "All fields are required" });
    } else {
      const existingEmployee = await Employee.findOne({ email });
      if (existingEmployee) {
        return res.status(400).json({ message: `Employee with ${email} already exists` });
      } else {
        const employee = await new Employee({
          name: name,
          email: email,
          password: password,
          department: department,
          position: position,
          role: role,
          image: image,
        });
        employee.save();
        return res.status(200).json({
          message: "Employee created successfully",
          employee: employee,
        });
      }
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.getEmployee = async (req, res) => {
  try {
    const employee = await Employee.find();
    if(!employee){
      return res.status(404).json({message:'No Employee data found'})
    }
    return res.status(200).json({ employee: employee });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
exports.getEmployeeById = async (req, res) => {
  try {
    const id = req.params.id;
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    } else {
      return res
        .status(200)
        .json({
          message: `Employee with ${id} details fetched successfully`,
          employee: employee,
        });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
exports.updateEmployee = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, email, password, department, position, role, image } =
      req.body;
    if (
      !name ||
      !email ||
      !password ||
      !department ||
      !position ||
      !role ||
      !image
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const employee = await Employee.findByIdAndUpdate(
      id,
      { name, email, password, department, position, role, image },
      { new: true },
    );
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    } else {
      return res.status(200).json({
        message: `Employee with ${id} updated successfully`,
        employee: employee,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
exports.deleteEmployee=async(req,res)=>{
  try{
    const id=req.params.id;
    const employee=await Employee.findByIdAndDelete(id);
    if(!employee){
      return res.status(404).json({ message: "Employee not found" });
    }
    else{
      return res.status(200).json({
        message: `Employee with ${id} deleted successfully`,
        employee: employee,
      });
    }

  }
  catch(error){
    return res.status(500).json({ message: "Internal server error" });
  }
}