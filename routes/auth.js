const {User, validateUser} = require('../models/user');
const moongoose=require('mongoose');
const express =require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const _ =require('lodash');
const Joi = require('joi');
const jwt = require("jsonwebtoken")
const config= require('config')
const {Student} = require('../models/student')
const {Teacher} = require('../models/teacher')
router.post("/", async(req, res)=>{
    const {error} =validate(req.body);
    if(error) return res.status(400).send(error.details[0].message)
    let user =await User.findOne({phoneNumber: req.body.phoneNumber})
    if(!user) return res.status(400).send("Invalid phone_number or password")
    const validated = await bcrypt.compare(req.body.password, user.password)
    if(!validated) return res.status(400).send("Invalid phone_number or password")
    const token = user.generateAuthToken()
    let _id = await findId(user)
    res.send({
        "token": token,
        "_id": _id,
        "role": user.role
    })
})
function validate(user) {
    const schema = Joi.object({
        password: Joi.string().required().min(6).max(255),
        phoneNumber: Joi.string().required().min(10),
    });

    return schema.validate(user);
}
async function findId(user){
    if (user.role =="parent"){
        let student = await Student.findOne({phoneNumber: user.phoneNumber})
        return student._id 
    }
    if (user.role =="teacher"){
        let teacher =await Teacher.findOne({phoneNumber: user.phoneNumber})
        return teacher._id
    }
    else{
        return null
    }
}
module.exports =router