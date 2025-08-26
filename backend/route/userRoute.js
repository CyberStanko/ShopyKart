const express = require('express');
const userData = require('../schema/UserSchema');

const router = express.Router();

router.post('/signup',async(req,res)=>{
    const {name,mail,password} = req.body;

    if(name!="" && mail!="" && password!="")
    {
        const user = new userData({name,mail,password});
        await user.save();
        res.status(200).json({"message":"User created success"});
    }
    else{
        res.status(400).json({"message":"Invalid data"});
    }
})

module.exports = router;