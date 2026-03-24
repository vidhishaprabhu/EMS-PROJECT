const Employee = require("../models/Employee");
const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
exports.createEmployee = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      department,
      position,
      image,
      role,
      gender,
      dateOfBirth,
    } = req.body;
    if (
      !name ||
      !email ||
      !password ||
      !department ||
      !position ||
      !image ||
      !gender ||
      !dateOfBirth
    ) {
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
          gender: gender,
          dateOfBirth: dateOfBirth,
          position: position,
          image: image,
          role: role,
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
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await Admin.findOne({ email });
    let role = "admin";

    if (!user) {
      user = await Employee.findOne({ email });
      role = "employee";
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
        email: user.email,
        role: role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: role,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.getEmployee = async (req, res) => {
  try {
    const employee = await Employee.find().populate("department", "name");
    if (!employee) {
      return res.status(404).json({ message: "No Employee data found" });
    }
    return res.status(200).json({ employee: employee });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
exports.getEmployeeInfo = async (req, res) => {
  try {
    const employee = await Employee.findById(req.user.id).populate(
      "department",
      "name",
    );
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
exports.getEmployeeById = async (req, res) => {
  try {
    const id = req.params.id;
    const employee = await Employee.findById(id).populate("department", "name");
    if (!employee) {
      return res.status(404).json({ message: `Employee with ${id} not found` });
    }
    return res.status(200).json({
      message: `Employee with ${id} details fetched successfully`,
      employee: employee,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
exports.changePasswordEmployee = async (req, res) => {
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

    const employeeId = req.user.id;

    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res
        .status(404)
        .json({ message: `Employee with ${employeeId} not found` });
    }

    const isMatch = await bcrypt.compare(currentPassword, employee.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
      400;
    }

    employee.password = await bcrypt.hash(newPassword, 10);
    await employee.save();

    return res
      .status(200)
      .json({ message: "Password changed successfully", employee: employee });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
exports.forgetPasswordEmployee = async (req, res) => {
  try {
    const { email, newPassword, confirmPassword } = req.body;
    if (!email || !newPassword || !confirmPassword) {
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

    const employee = await Employee.findOne({ email });
    if (!employee) {
      return res
        .status(404)
        .json({ message: `Employee with ${email} not found` });
    }

    employee.password = await bcrypt.hash(newPassword, 10);
    await employee.save();

    return res.status(200).json({ message: "Password reset successfully"});
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
exports.updateEmployee = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      name,
      email,
      department,
      position,
      role,
      image,
      gender,
      dateOfBirth,
    } = req.body;
    if (
      !name ||
      !email ||
      !department ||
      !position ||
      !image ||
      !gender ||
      !dateOfBirth
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const employee = await Employee.findByIdAndUpdate(
      id,
      { name, email, department, position, role, image, gender, dateOfBirth },
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
