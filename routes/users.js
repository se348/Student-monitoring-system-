const {User, validateUser} = require('../models/user');
const moongoose=require('mongoose');
const express =require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const _ =require('lodash')
router.post("/", async(req, res)=>{
    const {error} = validateUser(req.body) 
    if(error) return res.status(400).send("Unable to register user")
    let user =await User.findOne({phoneNumber: req.body.phoneNumber})
    if(user) return res.status(400).send("Invalid phone_number")
    let password = req.body.password
    let seed =await bcrypt.genSalt(10)
    password = await bcrypt.hash(password, seed)
    user = User({
        phoneNumber: req.body.phoneNumber,
        password: password,
        role: req.body.role
    })
    user =await user.save()
    res.send(_.pick(user, ["phoneNumber", "role"]))
})

module.exports =router