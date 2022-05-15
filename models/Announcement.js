const mongoose = require('mongoose');
const Joi = require('joi');


const announcementScehma = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 255,
        trim: true,
    },
    body: {
        type: String,
        required: true,
        min: 10,
    },
    createTime: {
        type: Date,
        default: Date.now
    },
    lastEdited: {
        type: Date,
        default: Date.now
    }
});

const Announcement = mongoose.model('Announcement' ,announcementScehma);

function validateAnnouncement(annc){
    const schema = Joi.object({
        title: Joi.string().required().min(3).max(255),
        body: Joi.string().required().min(10),
        createDate: Joi.date(),
        lastEdited: Joi.date(),
    });

    return schema.validate(annc);
}

module.exports.Announcement = Announcement;
module.exports.validateAnnouncement = validateAnnouncement;

