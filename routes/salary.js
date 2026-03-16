const express=require('express');
const router=express()
const {createSalary,getSalary,getSalaryById,updateSalary,deleteSalary}=require('../controllers/salary')
router.post('/',createSalary)
router.get('/',getSalary)
router.get('/:id',getSalaryById)
router.put('/:id',updateSalary)
router.delete('/:id',deleteSalary)

module.exports=router;