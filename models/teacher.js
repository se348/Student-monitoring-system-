const mongoose = require('mongoose');
const Joi = require('joi');

const teacherSchema = mongoose.Schema({
    sectionName: {
        type: String,
        required: true,
        trim: true,
    },
    subjectName: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    phoneNumber:{
        type: String,
        min: 10,
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
        lowercase: true,
    }
});

const Teacher = mongoose.model('Teacher', teacherSchema);

function validateTeacher(teacher) {
    const schema = Joi.object({
        name: Joi.string().required().min(5).max(255),
        sectionName: Joi.string().required(),
        subjectName: Joi.string().required(),
        phoneNumber: Joi.string().required().min(5).max(255),
        gender: Joi.string().valid('male', 'female'),

    });

    return schema.validate(teacher);
}

module.exports.Teacher = Teacher;
module.exports.validateTeacher = validateTeacher;
module.exports.teacherSchema =teacherSchema;