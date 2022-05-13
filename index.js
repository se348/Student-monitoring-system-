const express = require('express');
const mongoose =require('mongoose');
const students =require('./routes/students')
const grades =require('./routes/grades')
const teachers =require('./routes/teachers')
const app = express();

mongoose.connect('mongodb://localhost/sms')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use("/api/students",students )
app.use("/api/grades",grades )
app.use("/api/teachers", teachers)
const port = process.env.PORT =5000;
app.listen(port)