const mongoose =require('mongoose');
const Joi = require('joi')
const {subjectSchema} =require('./subject')
const Grade = mongoose.model("Grade", new mongoose.Schema({
    mark :subjectSchema
}))

function validateGrade(grade){
    const schema =Joi.object({
        mark : Joi.object().required(),
        _id: Joi.string().required()
    })

    return grade.validate(schema)
}
exports.Grade =Grade
exports.validateGrade= validateGrade