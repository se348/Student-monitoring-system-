const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = mongoose.Schema({
    password: {
        type: String,
        required: true,
        min: 5,
        max: 1024
    },
    role: {
        type: String,
        enum: ['parent', 'admin', 'teacher'],
        lowercase: true,
    },
    phoneNumber: {
        type: String,
        required: true,
        min: 10,
    }
});

const User = mongoose.model('User', userSchema);

function validateUser(user) {
    const schema = Joi.object({
        password: Joi.string().required().min(6).max(255),
        phoneNumber: Joi.string().required().min(10),
        role: Joi.string().valid('parent', 'admin', 'teacher'),

    });

    return schema.validate(user);
}

module.exports.User = User;
module.exports.validateUser = validateUser;