const express=require('express');
const router=express();
const {createEmployee,addBankDetails,login,getEmployee,getEmployeeInfo,getEmployeeById,changePasswordEmployee,forgetPassword,updateEmployee,deleteEmployee}=require('../controllers/employee')
const {verifyToken}=require('../middleware/authMiddleware')
const {checkRole}=require('../middleware/roleMiddleware')

router.post('/',verifyToken,checkRole('admin'),createEmployee)
router.post('/add-bank-details',verifyToken,checkRole('admin'),addBankDetails)
router.post('/login-admin-employee',login)
router.get('/',verifyToken,checkRole('admin'),getEmployee)
router.get('/profile',verifyToken,checkRole('employee'),getEmployeeInfo)
router.get('/:id',verifyToken,getEmployeeById);
router.put('/forget-password',forgetPassword);
router.put('/change-password-employee',verifyToken,checkRole('employee'),changePasswordEmployee)
router.put('/:id',verifyToken,checkRole('admin'),updateEmployee)
router.delete('/:id',verifyToken,checkRole('admin'),deleteEmployee)

module.exports=router;