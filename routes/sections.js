const {Student} = require('../models/student')
const express = require('express')
const router =express.Router()
const auth = require("")
router.get("/:sectionName", async (req, res)=>{
    const students = await Student.find({sectionName: req.params.sectionName })
    if(!students)
        res.status(400).send("No section found")
    let studentCollection=[]
    for(let student in students){
        studentCollection.push({
            _id: student._id,
            name: student.name,
            phoneNumber: student.phoneNumber
        })
    }
    res.send(studentCollection)
})