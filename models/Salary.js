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
  total:{
    type:Number,
    required:true
  }
},
{ 
  timestamps: true 
})
const Salary=mongoose.model("Salary",salarySchema);
module.exports=Salary