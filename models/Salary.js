const mongoose=require('mongoose');
const salarySchema=mongoose.Schema({
  employee:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Employee",
    required:true
  },
  department: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Department',        
    required: true 
  },
  basic:{
    type:Number,
    required:true
  },
  bonus:{
    type:Number,
    required:true
  },
  deduction:{
    type:Number,
    required:true
  },
  incomeTax: {
    type: Number,
    default: 0
  },
  pf: {
    type: Number,
    default: 0
  },
  professionalTax: {
    type: Number,
    default: 0
  },
  total:{
    type:Number,
  }
},
{ 
  timestamps: true 
})
const Salary=mongoose.model("Salary",salarySchema);
module.exports=Salary