const express=require('express');
const router=express();
const {createEmployee,login,getEmployee,getEmployeeById,updateEmployee,deleteEmployee}=require('../controllers/employee')

router.post('/',createEmployee)
router.post('/login',login)
router.get('/',getEmployee)
router.get('/:id',getEmployeeById)
router.put('/:id',updateEmployee)
router.delete('/:id',deleteEmployee)


module.exports=router;