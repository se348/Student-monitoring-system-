const {User} = require('../models/user')
async function adminTeacherPower (req, res, next){
    let user = await User.findById(req.user._id)
    if (String(user.role)!="admin"){
        if (String(user.role)!="teacher"){
            return res.status(403).send("Acces denied")
        }
    }
    next()
}

exports.adminTeacherPower =adminTeacherPower