const express=require('express');
const app=express();
const dotenv=require('dotenv');
dotenv.config({path:'./config/.env'})
const connectDB=require('./config/db')
const cors=require('cors')
connectDB();
app.use(express.json())
app.use(express.urlencoded({ extended: true })); 
app.use(cors())
const departmentRoutes=require('./routes/department')
const employeeRoutes=require('./routes/employee')
const leaveRoutes=require('./routes/leave');
const salaryRoutes=require('./routes/salary')
const adminRoutes=require('./routes/admin')
const dashboardRoutes=require('./routes/dashboard')

app.use('/api/department',departmentRoutes);
app.use('/api/employee',employeeRoutes)
app.use('/api/leave',leaveRoutes);
app.use('/api/salary',salaryRoutes)
app.use('/api/admin',adminRoutes);
app.use('/api/dashboard',dashboardRoutes);
app.listen(process.env.PORT,()=>{
  try{
    console.log(`Server started at port ${process.env.PORT}`);
  }
  catch(error){
    console.error('There is some error in server')
  }
})