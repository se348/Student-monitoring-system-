const {User} = require('../models/user')
async function adminPower (req, res, next){
    let user = await User.findById(req.user._id)
    if (String(user.role)!=="admin"){
        return res.status(403).send("Acces denied")
    }
    next()
}
module.exports.adminPower = adminPower