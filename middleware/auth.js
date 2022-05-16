const jwt =require('jsonwebtoken');
const config =require('config');

function auth (req, res, next){
    let token = req.header('auth-token');
    if(!token) return res.status(401).send("please provide token")
    try{
        token = jwt.verify(token, config.get('myKey'))
        req.user =token
        next();
    }
    catch(ex){
        res.status(400).send("Invalid token.")
    }
}

module.exports =auth