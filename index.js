const express = require('express');
const mongoose =require('mongoose');
const students =require('./routes/students')
const grades =require('./routes/grades')
const teachers =require('./routes/teachers')
const users =  require('./routes/users')
const {Admin} =require('./models/admin')
const auth =require('./routes/auth')
const announcement = require('./routes/announcement');
const app = express();

mongoose.connect('mongodb://localhost/sms')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

const admin = Admin({
  name: "adminn",
  phoneNumber: 0908070605
})
async function saveAdmin(){
  const admin_count = await Admin.find().count()
  console.log(admin_count)
  if (admin_count == 0){
    admin.save()
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