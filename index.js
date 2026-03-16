const express=require('express');
const app=express();
const dotenv=require('dotenv');
dotenv.config({path:'./config/.env'})
const connectDB=require('./config/db')
connectDB();
app.use(express.json())
const departmentRoutes=require('./routes/department')
app.use('/api/department',departmentRoutes);
app.listen(process.env.PORT,()=>{
  try{
    console.log(`Server started at port ${process.env.PORT}`);
  }
  catch(error){
    console.error('There is some error in server')
  }
})