const {Student, validateStudent} = require('../models/student');
const {Grade, validateGrade} =require('../models/grade')
const mongoose = require('mongoose');
const express = require('express');
const { Subject } = require('../models/subject');
const router = express.Router();

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
router.get('/:sectionName/:subjectName', async (req, res) => {
    const students = await Student.find({sectionName: req.params.sectionName}).select({subjects: 1, name: 1, _id: 1});
    student_collection =[]
    for(let student of students){
      indiv_student={}
      let variable =student.subjects.find((subject)=> subject.subjectName==req.params.subjectName)
      variable =Subject(variable) 
      if (variable!= null  & variable.test2!=-100){ 
        indiv_student.mark= variable,
        indiv_student._id= student._id
       student_collection.push(indiv_student)
       }
    }    
    res.send(student_collection);
  });
router.put('/', async (req, res) => {
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
router.put("/student/", async(req, res)=>{
  elem =Grade(req.body)
  const {error} =validateGrade(elem)
  if(error) return res.status(400).send("invalid input")
  student = await updateGrade(elem._id, elem.mark)
  res.send(student)
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
