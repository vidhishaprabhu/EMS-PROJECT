const express=require('express');
const router=express();
const {createAdmin,loginAdmin}=require('../controllers/admin')

router.post('/',createAdmin)
router.post('/login-admin',loginAdmin)

module.exports=router