const express=require('express');
const router=express();
const {createAdmin,addBankDetails,changePasswordAdmin}=require('../controllers/admin')
const {verifyToken}=require('../middleware/authMiddleware')
router.post('/',verifyToken,createAdmin)
router.put('/add-bank-details/:id',verifyToken,addBankDetails)
router.put('/change-password-admin',verifyToken,changePasswordAdmin)
module.exports=router