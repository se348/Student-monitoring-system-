const {Student, validateStudent} = require('../models/student');
const {Subject, validateSubject} = require('../models/subject'); 
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
async function getStudent(id){
    const student = await Student.findById(id);

    return {
        name: student.name,
        sectionName: student.sectionName,
        phoneNumber: student.phoneNumber,
        gender: student.gender
    };
}
async function updateStudent(id, info){
    const { error } = validateStudent(info);
    if (error)
        throw new Error(error);

    const student = await Student.findById(id);
    if (!student)
        return;

    student.set({
        name: info.name,
        phoneNumber: info.phoneNumber,
        gender: info.gender,
        section: info.section,
    });

    const result = await student.save();
    return {
        _id: result._id,
        name: result.name,
        sectionName: result.sectionName,
        phoneNumber: result.phoneNumber,
        gender: result.gender
    };
}

async function removeStudent(id) {
    const removedStudent = await Student.findByIdAndRemove(id);

    return {name: removedStudent.name,
        sectionName: removedStudent.sectionName,
        phoneNumber: removedStudent.phoneNumber,
        gender: removedStudent.gender};
}

router.get('/', async (req, res) => {
    const students = await Student.find().sort('name');
    let students_collection=[]
    for(let student of students){
        let s =Student(student)
        students_collection.push({
            _id: s._id,
            name: s.name,
            sectionName: s.sectionName,
            phoneNumber: s.phoneNumber,
            gender: s.gender
        })
    }
    res.send(students_collection);
  });
router.post('/', async (req, res) => {
    subjectNames =["history", "physics","chemistry","geography", "math", "ICT", "HPE" , "biology", "amharic", "aptitude", "civics", "bussiness", "economics"]
    let subjects=[]
    const { error } = validateStudent(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
    
    for (let subject of subjectNames){
        s= Subject()
        s.subjectName= subject
        s.test2=-100
        s.test1=-100
        s.mid =-100
        s.final =-100
        s.assesment=-100
        subjects.push(s)
    }

    let student = new Student(
    { 
        _id: student._id,
        name: req.body.name,
        gender: req.body.gender,
        phoneNumber: req.body.phoneNumber,
        sectionName: req.body.sectionName,     
        subjects: subjects
    }
    );
    
    student = await student.save();

    res.send({
        _id: student._id,
        name: student.name,
        sectionName: student.sectionName,
        phoneNumber: student.phoneNumber,
        gender: student.gender
    });
});
router.get('/:id', async (req, res) => {
    const student = getStudent(req.params.id);

    if (!student)
        res.status(404).send(student);
    res.status(200).send({
        _id: student._id,
        name: student.name,
        sectionName: student.sectionName,
        phoneNumber: student.phoneNumber,
        gender: student.gender
    });
});

router.put('/:id', async (req, res) => {
    const updatedStudent = await updateStudent(req.params.id, req.body);
    if (!updatedStudent)
        res.send();

    res.send({
        _id: updatedStudent._id,
        name: updatedStudent.name,
        sectionName: updatedStudent.sectionName,
        phoneNumber: updatedStudent.phoneNumber,
        gender: updatedStudent.gender
    });
});

router.delete('/:id', async (req, res) => {
    const deletedStudent = await removeStudent(req.params.id);
    if (!deletedStudent)
        res.status(404).send('Student was not found');

    res.send({
        _id: deletedStudent._id,
        name: deletedStudent.name,
        sectionName: deletedStudent.sectionName,
        phoneNumber: deletedStudent.phoneNumber,
        gender: deletedStudent.gender
    });
})
module.exports = router; 