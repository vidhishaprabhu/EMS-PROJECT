const express=require('express');
const router=express();
const {createEmployee,login,getEmployee,getEmployeeInfo,getEmployeeById,changePasswordEmployee,updateEmployee,deleteEmployee}=require('../controllers/employee')
const {verifyToken}=require('../middleware/authMiddleware')
const {checkRole}=require('../middleware/roleMiddleware')

router.post('/',verifyToken,checkRole('admin'),createEmployee)
router.post('/login-admin-employee',login)
router.get('/',verifyToken,checkRole('admin'),getEmployee)
router.get('/profile',verifyToken,checkRole('employee'),getEmployeeInfo)
router.get('/:id',verifyToken,getEmployeeById);
router.put('/change-password-employee',verifyToken,checkRole('employee'),changePasswordEmployee)
router.put('/:id',verifyToken,checkRole('admin'),updateEmployee)
router.delete('/:id',verifyToken,checkRole('admin'),deleteEmployee)

module.exports=router;