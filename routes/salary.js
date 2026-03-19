const express=require('express');
const router=express()
const {createSalary,getSalary,getSalaryById,getSalaryInfo,getSalaryByEmployeeId,updateSalary,deleteSalary}=require('../controllers/salary')
const {verifyToken}=require('../middleware/authMiddleware')
const {checkRole}=require('../middleware/roleMiddleware')

router.post('/',verifyToken,checkRole('admin'),createSalary)
router.get('/',verifyToken,checkRole('admin'),getSalary)
router.get('/get-salary',verifyToken,checkRole('employee'),getSalaryInfo)
router.get('/:id',getSalaryById)
router.get('employee/:id',getSalaryInfo)
router.get('/employee/:id',getSalaryByEmployeeId)
router.put('/:id',verifyToken,checkRole('admin'),updateSalary)
router.delete('/:id',verifyToken,checkRole('admin'),deleteSalary)

module.exports=router;