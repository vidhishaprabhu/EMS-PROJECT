const mongoose=require('mongoose');
const connection=async()=>{
  try{
    const conn=await mongoose.connect(process.env.MONGO_URI,{});
    console.log('Mongodb connected sucessfully');

  }
  catch(error){
    console.error('There is some error while connecting to database')
    process.exit(1);
  }
}
module.exports=connection