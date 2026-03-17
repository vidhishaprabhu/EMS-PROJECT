const express=require('express');
const router=express();
const {adminDashboard,employeeDashboard}=require('../controllers/dashboard')
const {verifyToken}=require('../middleware/authMiddleware')
const {checkRole}=require('../middleware/roleMiddleware')

router.get('/admin-dashboard',verifyToken,checkRole('admin'),adminDashboard);
router.get('/employee-dashboard',verifyToken,checkRole('employee'),employeeDashboard);

module.exports=router;