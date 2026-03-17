const express=require('express');
const router=express();
const {createEmployee,loginEmployee,getEmployee,getEmployeeById,updateEmployee,deleteEmployee}=require('../controllers/employee')
const {verifyToken}=require('../middleware/authMiddleware')
const {checkRole}=require('../middleware/roleMiddleware')

router.post('/',verifyToken,checkRole('admin'),createEmployee)
router.post('/login-employee',loginEmployee)
router.get('/',getEmployee)
router.get('/:id',verifyToken,getEmployeeById)
router.put('/:id',verifyToken,updateEmployee)
router.delete('/:id',verifyToken,deleteEmployee)

module.exports=router;