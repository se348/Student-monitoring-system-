const config = require('config')
const express = require('express');
const mongoose =require('mongoose');
const students =require('./routes/students')
const grades =require('./routes/grades')
const teachers =require('./routes/teachers')
const users =  require('./routes/users')
const {Admin} =require('./models/admin')
const auth =require('./routes/auth')
const announcement = require('./routes/announcement');
const bcrypt =require('bcrypt')
const app = express();
const {User} =require('./models/user')
if(!config.get('myKey')){
  console.error("Please set environment variable and try again - export sms_myKey=anything you wish")
  process.exit(1)
}


mongoose.connect('mongodb://localhost/sms')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));
async function find_password_for_admin(){
  let seed =await bcrypt.genSalt(10)
  let password = await bcrypt.hash("admining", seed)
  return password
}
async function saveAdmin(){
  let user = await User.findOne({"role": "admin"})
  if(!user){
    let admin = User({
      "phoneNumber": "09858486744",
      "role": "admin",
      "password": String(await find_password_for_admin())
    })
    await admin.save()
  }  
}
saveAdmin()
app.use(express.json());
app.use("/api/users", users)
app.use("/api/students",students )
app.use("/api/grades",grades )
app.use("/api/teachers", teachers)
app.use("/api/auth", auth);
app.use('/api/announcement', announcement);
const port = process.env.PORT =5000;
app.listen(port)