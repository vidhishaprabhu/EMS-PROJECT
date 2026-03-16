const Salary = require("../models/Salary");

exports.createSalary = async (req, res) => {
  try {
    const { employee, basic, bonus, deduction, total } = req.body;
    if (!employee || !basic || !bonus || !deduction || !total) {
      return req.status(400).json({ message: "All fields are required" });
    } else {
      const salary = new Salary({
        employee: employee,
        basic: basic,
        bonus: bonus,
        deduction: deduction,
        total: total,
      });
      salary.save();
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
exports.getSalaryById = async (req, res) => {
  try {
    const id = req.params.id;
    const salary = await Salary.findById(id);
    if (!salary) {
      return res.status(404).json({ message: `Salary with ${id} not found` });
    } else {
      return res
        .status(200)
        .json({
          message: `Salary with ${id} fetched successfully`,
          salary: salary,
        });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
exports.updateSalary = async (req, res) => {
  try {
    const id = req.params.id;
    const { employee, basic, bonus, deduction, total } = req.body;
    if (!employee || !basic || !bonus || !deduction || !total) {
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
        return res
          .status(200)
          .json({
            message: `Salary with ${id} updated successfully`,
            salary: salary,
          });
      }
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
exports.deleteSalary=async(req,res)=>{
  try{
    const id=req.params.id;
    const salary=await Salary.findByIdAndDelete(id);
    if(!salary){
      return res.status(404).json({ message: `Salary with ${id} not found` });
    }
    else{
      return res
          .status(200)
          .json({
            message: `Salary with ${id} deleted successfully`,
            salary: salary,
          });
    }

  }
  catch(error){
    return res.status(500).json({ message: "Internal server error" });
  }
}