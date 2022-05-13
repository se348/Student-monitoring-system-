const {Teacher, validateTeacher} = require('../models/teacher');
 const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
async function getTeacher(id){
    const teacher = await Teacher.findById(id);

    return teacher;
}
async function updateTeacher(id, info){
    const { error } = validateTeacher(info);
    if (error)
        throw new Error(error);

    const teacher = await Teacher.findById(id);
    if (!teacher)
        return;

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

router.get('/', async (req, res) => {
    const teachers = await Teacher.find().sort('name');
    res.send(teachers);
  });
router.post('/', async (req, res) => {
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
router.get('/:id', async (req, res) => {
    const teacher = getTeacher(req.params.id);

    if (!teacher)
        res.status(404).send(teacher);
    res.status(200).send(teacher);
});

router.put('/:id', async (req, res) => {
    const updatedTeacher = await updateTeacher(req.params.id, req.body);
    if (!updatedTeacher)
        res.send();

    res.send(updatedTeacher);
});

router.delete('/:id', async (req, res) => {
    const deletedTeacher = await removeTeacher(req.params.id);
    if (!deletedTeacher)
        res.status(404).send('Teacher was not found');

    res.send(deletedTeacher);
})
module.exports = router; 