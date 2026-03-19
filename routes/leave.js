const express=require('express');
const router=express()
const {createLeave,getLeave,getLeaveById,getLeaveByEmployeeId,updateLeave,deleteLeave}=require('../controllers/leave')
const {verifyToken}=require('../middleware/authMiddleware')
const {checkRole}=require('../middleware/roleMiddleware')

router.post('/',verifyToken,checkRole('employee'),createLeave)
router.get('/',verifyToken,checkRole('admin'),getLeave)
router.get('/my-leaves',verifyToken,checkRole('employee'),getLeaveById)
router.get('/employee/:id',verifyToken,getLeaveByEmployeeId)
router.put('/:id',verifyToken,checkRole('admin'),updateLeave)
router.delete('/:id',verifyToken,checkRole('admin'),deleteLeave)

module.exports=router;