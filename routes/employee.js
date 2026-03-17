const express=require('express');
const router=express();
const {createEmployee,loginEmployee,getEmployee,getEmployeeById,updateEmployee,deleteEmployee}=require('../controllers/employee')
const {verifyToken}=require('../middleware/authMiddleware')
const {checkRole}=require('../middleware/roleMiddleware')

router.post('/',verifyToken,checkRole('admin'),createEmployee)
router.post('/login-employee',loginEmployee)
router.get('/',verifyToken,checkRole('admin'),getEmployee)
router.get('/profile',verifyToken,checkRole('employee'),getEmployeeById)
router.put('/:id',verifyToken,checkRole('admin'),updateEmployee)
router.delete('/:id',verifyToken,checkRole('admin'),deleteEmployee)

module.exports=router;