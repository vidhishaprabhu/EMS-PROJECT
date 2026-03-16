const mongoose=require('mongoose');
const leaveSchema=mongoose.Schema({
  employee:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Employee",
    required:true
  },
  fromDate:{
    type:Date,
    required:true
  },
  toDate:{
    type:Date,
    required:true
  },
  reason:{
    type:String,
    required:true
  },
  status:{
    type:String,
    default:"Pending",
  }
})
const Leave=mongoose.model("Leave",leaveSchema);
module.exports=Leave