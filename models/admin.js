// const mongoose = require('mongoose');
// const Joi = require('joi');

// const adminSchema = mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//     },
//     phoneNumber:{
//         type: String,
//         min: 10,
//     },
    
// });

// const Admin = mongoose.model('Admin', adminSchema);

// function validateAdmin(admin) {
//     const schema = Joi.object({
//         name: Joi.string().required().min(5).max(255),
//         phoneNumber: Joi.string().required().min(5).max(255),
//     });

//     return schema.validate(admin);
// }

// module.exports.Admin = Admin;
// module.exports.validateAdmin = validateAdmin;