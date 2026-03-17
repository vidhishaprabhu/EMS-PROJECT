const express=require('express');
const router=express()
const {createSalary,getSalary,getSalaryById,updateSalary,deleteSalary}=require('../controllers/salary')
const {verifyToken}=require('../middleware/authMiddleware')
const {checkRole}=require('../middleware/roleMiddleware')

router.post('/',verifyToken,checkRole('admin'),createSalary)
router.get('/',verifyToken,checkRole('admin'),getSalary)
router.get('/get-salary',verifyToken,checkRole('employee'),getSalaryById)
router.put('/:id',verifyToken,checkRole('admin'),updateSalary)
router.delete('/:id',verifyToken,checkRole('admin'),deleteSalary)

module.exports=router;