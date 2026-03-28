const Salary = require("../models/Salary");

exports.createSalary = async (req, res) => {
  try {
    const { employee, basic, bonus, department, deduction} = req.body;
    if (!employee || !basic || !bonus || !department || !deduction) {
      return res.status(400).json({ message: "All fields are required" });
    } else {
      const pf = basic * 0.12;

    let professionalTax = 0;
    if (basic > 15000) {
      professionalTax = 200;
    }

    let incomeTax = 0;

    if (basic <= 25000) {
      incomeTax = 0;
    } else if (basic <= 50000) {
      incomeTax = basic * 0.10;
    } else {
      incomeTax = basic * 0.20;
    }

    const total =
      basic +
      bonus -
      (deduction + pf + professionalTax + incomeTax);
      const salary = new Salary({
        employee: employee,
        basic: basic,
        bonus: bonus,
        department:department,
        deduction: deduction,
        pf:pf,
        professionalTax: professionalTax,
        incomeTax:incomeTax,
        total: total,
      });
      await salary.save();
      return res
        .status(200)
        .json({ message: "Salary created successfully", salary: salary });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
exports.getSalary = async (req, res) => {
  try {
    const salary = await Salary.find();
    if (!salary) {
      return res.status(404).json({ message: "No Salary data found" });
    } else {
      return res
        .status(200)
        .json({ message: "Salary fetched successfully", salary: salary });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
exports.getSalaryInfo = async (req, res) => {
  try {
    // console.log("hgkghhhhhhh")
    const employeeId=req.user.id
    console.log('Employee ID from token:', employeeId); 
    const now = new Date();

    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const firstDayOfNextMonth = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      1
    );

    const salary = await Salary.find({
      employee: employeeId,
      createdAt: {
    $gte: firstDayOfMonth,
    $lt: firstDayOfNextMonth
  }

    })
   console.log('Salary found:', salary);
    if (!salary || salary.length === 0) {
      return res.status(404).json({ message: "Salary not found" });
    } else {
      return res
        .status(200)
        .json({ message: `Salary fetched successfully`, salary: salary});
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
exports.getSalaryById = async (req, res) => {
  try {
    const id = req.params.id;
    const salary = await Salary.findById(id).populate('employee','name');
    if (!salary) {
      return res.status(404).json({ message: `Salary with ${id} not found` });
    }
    return res
      .status(200)
      .json({
        message: `Salary with ${id} fetched successfully`,
        salary: salary,
      });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
exports.getSalaryByEmployeeId = async (req, res) => {
  try {
    const salary = await Salary.findOne({ employee: req.params.id })
      .populate('employee', 'name email');

    if (!salary) {
      return res.status(404).json({ message: "Salary not found" });
    }

    return res.status(200).json({ salary });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
exports.updateSalary = async (req, res) => {
  try {
    const id = req.params.id;
    const { employee, basic, bonus,department, deduction, total } = req.body;
    if (!employee || !basic || !bonus || !department || !deduction || !total) {
      return req.status(400).json({ message: "All fields are required" });
    } else {
      const salary = await Salary.findByIdAndUpdate(
        id,
        { employee, basic, bonus, deduction, total },
        { new: true },
      );
      if (!salary) {
        return res.status(404).json({ message: `Salary with ${id} not found` });
      } else {
        return res.status(200).json({
          message: `Salary with ${id} updated successfully`,
          salary: salary,
        });
      }
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
exports.deleteSalary = async (req, res) => {
  try {
    const id = req.params.id;
    const salary = await Salary.findByIdAndDelete(id);
    if (!salary) {
      return res.status(404).json({ message: `Salary with ${id} not found` });
    } else {
      return res.status(200).json({
        message: `Salary with ${id} deleted successfully`,
        salary: salary,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
