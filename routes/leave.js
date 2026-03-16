const express=require('express');
const router=express()
const {createLeave,getLeave,getLeaveById,updateLeave,deleteLeave}=require('../controllers/leave')

router.post('/',createLeave)
router.get('/',getLeave)
router.get('/:id',getLeaveById)
router.put('/:id',updateLeave)
router.delete('/:id',deleteLeave)

module.exports=router;