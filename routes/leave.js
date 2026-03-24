const express=require('express');
const router=express()
const {createLeave,getLeave,getLeaveInfo,getLeaveByEmployeeId,getLeaveById,updateLeave,deleteLeave,updateLeaveStatus}=require('../controllers/leave')
const {verifyToken}=require('../middleware/authMiddleware')
const {checkRole}=require('../middleware/roleMiddleware')

router.post('/',verifyToken,checkRole('employee'),createLeave)
router.get('/',verifyToken,checkRole('admin'),getLeave)
router.get('/my-leaves',verifyToken,getLeaveInfo)
router.get('/employee/:id',verifyToken,getLeaveByEmployeeId)
router.get('/:id',verifyToken,getLeaveById)
router.put('/:id',verifyToken,checkRole('admin'),updateLeave)
router.patch('/update-status/:id',verifyToken,updateLeaveStatus)
router.delete('/:id',verifyToken,checkRole('admin'),deleteLeave)

module.exports=router;