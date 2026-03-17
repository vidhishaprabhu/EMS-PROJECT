const Employee = require("../models/Employee");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
exports.createEmployee = async (req, res) => {
  try {
    const { name, email, password, department, position, image } = req.body;
    if (!name || !email || !password || !department || !position || !image) {
      return res.status(400).json({ message: "All fields are required" });
    } else {
      const existingEmployee = await Employee.findOne({ email });
      if (existingEmployee) {
        return res
          .status(400)
          .json({ message: `Employee with ${email} already exists` });
      } else {
        const hashpassword = await bcrypt.hash(password, 10);
        const employee = await new Employee({
          name: name,
          email: email,
          password: hashpassword,
          department: department,
          position: position,
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
exports.loginEmployee = async (req, res) => {
  try {
    const { email, password} = req.body;
    const existingEmp = await Employee.findOne({ email });
    if (!existingEmp) {
      return res.status(404).json({ message: "Employee not found" });
    }
    const isMatch = await bcrypt.compare(password, existingEmp.password);
    if (!isMatch) {
      return res.status(404).json({ message: "Password does not match" });
    }
    const token = jwt.sign(
      { id: existingEmp._id, name: existingEmp.name, email: existingEmp.email,role:existingEmp.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    return res.status(200).json({
      message: "Login was successfull",
      token:token,
      user: {
        id: existingEmp._id,
        name: existingEmp.name,
        email: existingEmp.email,
        role:existingEmp.role
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.getEmployee = async (req, res) => {
  try {
    const employee = await Employee.find();
    if (!employee) {
      return res.status(404).json({ message: "No Employee data found" });
    }
    return res.status(200).json({ employee: employee });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.user.id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    } else {
      return res.status(200).json({
        message: `Employee details fetched successfully`,
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
exports.deleteEmployee = async (req, res) => {
  try {
    const id = req.params.id;
    const employee = await Employee.findByIdAndDelete(id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    } else {
      return res.status(200).json({
        message: `Employee with ${id} deleted successfully`,
        employee: employee,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
