const mongoose = require('mongoose');
const Joi = require('joi');

const subjectSchema = mongoose.Schema({
    subjectName: {
        type: String,
        required: true,
    },
    test2: {
        type: Number,
        max: 10, 
        default: 0
    },
    mid: {
        type: Number,
        max: 20,
        default: 0
    },
    final: {
        type: Number,
        max: 45,
        default: 0,
    },
    test1: {
        type: Number,
        max: 10,
        default: 0
    },
    assesment: {
        type: Number,
        max: 15,
        default: 0
    },

});

const Subject = mongoose.model('Subject', subjectSchema);

function validateSubject(subject) {
    const schema = Joi.object({
        subjectName: Joi.string().required(),
        test2: Joi.number(),
        test1: Joi.number(),
        mid: Joi.number(),
        final: Joi.number(),
        assesment: Joi.number(),
        // _id: Joi.string()
    });

    return schema.validate(subject);
}

module.exports.Subject = Subject;
module.exports.validateSubject = validateSubject;
module.exports.subjectSchema =subjectSchema;