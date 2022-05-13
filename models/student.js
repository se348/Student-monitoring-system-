const Joi = require('joi');
const mongoose = require('mongoose');
const {subjectSchema} = require('./subject');
const studentSchema = new mongoose.Schema({
    sectionName: {
        type: String,
        required: true,
        min: 2,
        trim: true,
        uppercase:true
    },
    name: {
        type: String,
        required: true,
        min: 5,
        max: 255,
    },
    phoneNumber: {
        type: String,
        required: true,
        min: 10,
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
        lowercase: true,
    },
    subjects: {
        type: [subjectSchema] 
    }
    }
)
const Student = mongoose.model("Student", studentSchema)
function validateStudent(student) {
    const schema = Joi.object({
        name: Joi.string().required().min(5).max(255),
        phoneNumber: Joi.string().required().min(10),
        gender: Joi.string().valid('male', 'female'),
        sectionName: Joi.string(),
        subjects: Joi.array(),
    });

    return schema.validate(student);
}
module.exports.Student = Student;
module.exports.validateStudent = validateStudent;