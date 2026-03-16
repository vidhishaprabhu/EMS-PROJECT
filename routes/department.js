const express=require('express')
const router=express();
const {createDepartment,getDepartment,getById,updateDepartment,deleteDepartment}=require('../controllers/department')

router.post('/',createDepartment)
router.get('/',getDepartment)
router.get('/:id',getById)
router.put('/:id',updateDepartment)
router.delete('/:id',deleteDepartment)

module.exports=router