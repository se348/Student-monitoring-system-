const {Student, validateStudent} = require('../models/student');
const {Grade, validateGrade} =require('../models/grade')
const mongoose = require('mongoose');
const express = require('express');
const { Subject } = require('../models/subject');
const router = express.Router();
const _ = require('lodash');
const res = require('express/lib/response');
const auth =require("../middleware/auth")
const {adminTeacherPower} = require('../middleware/adminOrTeacher')
const {User} = require('../models/user')


async function updateGrade(studentId, newMark){
  let student = await Student.findById(studentId)
  if(!student) return res.status(400).send("not a right input")
  subjects_of_student =student.subjects
  let mark1
  for (let [i,subject] of subjects_of_student.entries()){
    
    if ((String)(subject.subjectName) ==(String)( newMark.subjectName)){
      newMark._id =subject._id
      subjects_of_student[i] =newMark
      mark1=newMark
    }
  }
  
  student =student.save()
  return {
    _id: student._id,
    mark: mark1
  }
}
async function deleteGrade(studentId, subjectName){
  let student = await Student.findById(studentId)
  if(!student) return res.status(400).send("not a right input")
  subjects_of_student =student.subjects
  let mark1
  for (let [i,subject] of subjects_of_student.entries()){
    
    if ((String)(subject.subjectName) ==(String)(subjectName)){
      subject.test2 =-100
      subject.test1 =-100
      subject.mid =-100
      subject.final =-100
      subject.assesment=-100
      subjects_of_student[i] =subject
    }
  }
  
  student =student.save()
  return {
    _id: student._id,
  }
}

router.get('/:sectionName/:subjectName',[auth, adminTeacherPower], async (req, res) => {
    const students = await Student.find({sectionName: req.params.sectionName}).select({subjects: 1, name: 1, _id: 1});
    student_collection =[]
    for(let student of students){
      indiv_student={}
      let variable =student.subjects.find((subject)=> subject.subjectName==req.params.subjectName)
      variable =Subject(variable) 
      if (variable!= null  & variable.test2!=-100){ 
        indiv_student.mark= _.pick(variable, ["test2", "mid", "final","test1", "assesment"]),
        indiv_student._id= student._id
       student_collection.push(indiv_student)
       }
    }    
    res.send(student_collection);
  });
router.put('/', [auth,adminTeacherPower],async (req, res) => {
  const students_of_section = req.body;
  collection=[]
  for(let elem of students_of_section){
    elem =Grade(elem)
    const {error} =validateGrade(elem)
    if(error) return res.status(400).send("invalid input")
    student = await updateGrade(elem._id, elem.mark)
    collection.push(student)
  }
    res.send(collection);
});
router.put("/students",[auth,adminTeacherPower] ,async(req, res)=>{
  elem =Grade(req.body)
  const {error} =validateGrade(elem)
  if(error) return res.status(400).send("invalid input")
  student = await updateGrade(elem._id, elem.mark)
  res.send(student)
})
router.get("/:studentId",auth, async(req, res)=>{
  const student = await Student.findById( req.params.studentId).select({subjects: 1, name: 1, _id: 1});
  if (!student) return res.status(400).send("No student found")
  let user = await User.findById(req.user._id)
    if (String(user.role)!="admin"){
        if (String(user.role)!="teacher"){
          if(String(student.phoneNumber) != String(user.phoneNumber)){  
            return res.status(403).send("Acces denied")
          }
        }
    }
  subject_collection =[]
    for(let subject of student.subjects){
      variable =Subject(subject) 
      if (variable.test2!=-100){ 
        indiv_subject= _.pick(variable, ["test2", "mid", "final","test1", "assesment", "subjectName"]),
        subject_collection.push(indiv_subject)
       }
    }    
    res.send(subject_collection);
})
router.get("/student/:studentId/:subjectName",auth, async(req, res)=>{
  const student = await Student.findById( req.params.studentId).select({subjects: 1, name: 1, _id: 1});
  if (!student) return res.status(400).send("No student found")
  let user = await User.findById(req.user._id)
    if (String(user.role)!="admin"){
        if (String(user.role)!="teacher"){
          if(String(student.phoneNumber) != String(user.phoneNumber)){  
            return res.status(403).send("Acces denied")
          }
        }
    }
  for(let subject of student.subjects){
    variable =Subject(subject) 
    if (variable.test2!=-100 & variable.subjectName==req.params.subjectName){ 
      indiv_subject= _.pick(variable, ["test2", "mid", "final","test1", "assesment"]),
      res.send(indiv_subject)
      break
    }
  }
  res.status(400).send("No subject found")
})

router.delete("/:sectionName/:subjectName",[auth, adminTeacherPower],async (req,res)=>{
  const students = await Student.find({sectionName: req.params.sectionName}).select({subjects: 1, name: 1, _id: 1});
    for(let student of students){
      indiv_student={}
      let variable =student.subjects.find((subject)=> subject.subjectName==req.params.subjectName)
      variable =Subject(variable) 
      if (variable!= null  & variable.test2!=-100){ 
        await deleteGrade(student._id, variable.subjectName)
       }
    }
    res.send("succesful")    
})
router.delete("/student/:studentId/:subjectName", [auth, adminTeacherPower],async(req, res)=>{
  const student = await Student.findById( req.params.studentId).select({subjects: 1, name: 1, _id: 1});
  if (!student) return res.status(400).send("No student found")
  for(let subject of student.subjects){
    variable =Subject(subject) 
    if (variable.test2!=-100 & variable.subjectName==req.params.subjectName){ 
      await deleteGrade(student._id, variable.subjectName)
      res.send("succesful")
      break
    }
  }
  res.status(400).send("No subject found")
})
module.exports = router; 
















































































// const {Student, validateStudent} = require('../models/student');
// const {Grade, validateGrade} =require('../models/grade')
// const mongoose = require('mongoose');
// const express = require('express');
// const { Subject } = require('../models/subject');
// const router = express.Router();

// async function updateGrade(studentId, newMark){
//   let student = await Student.findById(studentId)
//   if(!student) return res.status(400).send("not a right input")
//   subjects_of_student =student.subjects
//   for (let [i,subject] of subjects_of_student.entries()){
    
//     if ((String)(subject._id) ==(String)( newMark._id)){
//       subjects_of_student[i] =newMark
//     }
//   }
  
//   return student.save()
// }
// router.get('/:sectionName/:subjectName', async (req, res) => {
//     const students = await Student.find({sectionName: req.params.sectionName}).select({subjects: 1, name: 1, _id: 1});
//     student_collection =[]
//     for(let student of students){
//       indiv_student={}
//       let variable =student.subjects.find((subject)=> subject.subjectName==req.params.subjectName)
//       variable =Subject(variable) 
//       if (variable!= null  & variable.test2!=-100){ 
//         indiv_student.mark= variable,
//         indiv_student._id= student._id
//        student_collection.push(indiv_student)
//        }
//     }    
//     res.send(student_collection);
//   });
// router.put('/', async (req, res) => {
//   const students_of_section = req.body;
//   collection=[]
//   for(let elem of students_of_section){
//     elem =Grade(elem)
//     const {error} =validateGrade(elem)
//     if(error) return res.status(400).send("invalid input")
//     student = await updateGrade(elem._id, elem.mark)
//     collection.push(student)
//   }
//     res.send(collection);
// });
// router.put("/student/", async(req, res)=>{
//   elem =Grade(req.body)
//   const {error} =validateGrade(elem)
//   if(error) return res.status(400).send("invalid input")
//   student = await updateGrade(elem._id, elem.mark)
//   res.send(student)
// })

// module.exports = router; 
