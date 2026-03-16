const express=require('express');
const router=express();
const {createEmployee,loginEmployee,getEmployee,getEmployeeById,updateEmployee,deleteEmployee}=require('../controllers/employee')

router.post('/',createEmployee)
router.post('/login',loginEmployee)
router.get('/',getEmployee)
router.get('/:id',getEmployeeById)
router.put('/:id',updateEmployee)
router.delete('/:id',deleteEmployee)


module.exports=router;