const {Teacher, validateTeacher} = require('../models/teacher');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const auth =require("../middleware/auth")
const {adminPower}= require('../middleware/admin')
const {User} =require('../models/user');
const res = require('express/lib/response');

async function getTeacher(id){
    const teacher = await Teacher.findById(id);

    return teacher;
}

async function updateTeacher(id, info, req){
    const user =await User.findById(req.user._id)
    const { error } = validateTeacher(info);
    if (error)
        res.status(400).send(error.details[0].message);

    const teacher = await Teacher.findById(id);
    if (!teacher)
        return res.status(400).send("No teacher found");
    if(String(teacher.phoneNumber) != String(user.phoneNumber)){
        if(String(user.role) != 'admin'){
            return res.status(403).send("Forbidden access")
        } 
    }

    teacher.set({
        name: info.name,
        phoneNumber: info.phoneNumber,
        gender: info.gender,
        sectionName: info.sectionName,
        subjectName: info.subjectName
    });

    const result = await teacher.save();
    return result;
}

async function removeTeacher(id) {
    const removedTeacher = await Student.findByIdAndRemove(id);

    return removedTeacher;
}

router.get('/',auth, async (req, res) => {
    const teachers = await Teacher.find().sort('name');
    res.send(teachers);
  });
router.post('/', [auth, adminPower], async (req, res) => {
    const { error } = validateTeacher(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    let teacher = new Teacher(
    { 
        name: req.body.name,
        gender: req.body.gender,
        phoneNumber: req.body.phoneNumber,
        sectionName: req.body.sectionName,     
        subjectName: req.body.subjectName
    }
    );
    
    teacher = await teacher.save();

    res.send(teacher);
});
router.get('/:id', auth,async (req, res) => {
    const teacher = getTeacher(req.params.id);

    if (!teacher)
        res.status(404).send(teacher);
    res.status(200).send(teacher);
});

router.put('/:id', auth,async (req, res) => {
    const updatedTeacher = await updateTeacher(req.params.id, req.body, req);
    if (!updatedTeacher)
        res.send();

    res.send(updatedTeacher);
});

router.delete('/:id',[auth, adminPower] , async (req, res) => {
    const deletedTeacher = await removeTeacher(req.params.id);
    if (!deletedTeacher)
        res.status(404).send('Teacher was not found');

    res.send(deletedTeacher);
})
module.exports = router; 