const express=require('express')
const router=express();
const {createDepartment,getDepartment,getById,updateDepartment,deleteDepartment}=require('../controllers/department')
const {verifyToken}=require('../middleware/authMiddleware')
const {checkRole}=require('../middleware/roleMiddleware')

router.post('/',verifyToken,checkRole('admin'),createDepartment)
router.get('/',verifyToken,checkRole('admin'),getDepartment)
router.get('/get-department',verifyToken,checkRole('employee'),getById)
router.put('/:id',verifyToken,checkRole('admin'),updateDepartment)
router.delete('/:id',verifyToken,checkRole('admin'),deleteDepartment)

module.exports=router