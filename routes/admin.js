const express=require('express');
const router=express();
const {createAdmin,changePasswordAdmin}=require('../controllers/admin')
const {verifyToken}=require('../middleware/authMiddleware')
router.post('/',verifyToken,createAdmin)
router.put('/change-password-admin',verifyToken,changePasswordAdmin)
module.exports=router