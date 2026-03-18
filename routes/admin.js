const express=require('express');
const router=express();
const {createAdmin}=require('../controllers/admin')

router.post('/',createAdmin)

module.exports=router