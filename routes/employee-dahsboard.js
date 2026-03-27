const express=require('express')
const router=express();
const {getEmployeeKpi,totalLeaveBalance}=require('../controllers/employee-dashboard')
const {verifyToken}=require('../middleware/authMiddleware')
const {checkRole}=require('../middleware/roleMiddleware')

router.get('/',verifyToken,checkRole('employee'),getEmployeeKpi)
router.get('/total-leave-balance',verifyToken,checkRole('employee'),totalLeaveBalance);

module.exports=router