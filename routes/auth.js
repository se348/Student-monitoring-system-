const {User, validateUser} = require('../models/user');
const moongoose=require('mongoose');
const express =require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const _ =require('lodash');

router.post("/", async(req, res)=>{
    console.log(req.body)
    let user =await User.findOne({phoneNumber: req.body.phoneNumber})
    if(!user) return res.status(400).send("Invalid phone_number or password")
    const validated = await bcrypt.compare(req.body.password, user.password)
    if(!validated) return res.status(400).send("Invalid phone_number or password")
    res.send("succesful login")
})

module.exports =router