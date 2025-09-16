const express = require('express');
const userRoutes = require('./routes/userRoute');
const authRoutes = require('./routes/authRoutes')
const cores =  require('cors')



const app = express();
app.use(cores())
app.use(express.json());



//Route
app.use('/', userRoutes); 
app.use('/',authRoutes)

// Health check
app.get('/',(req,res)=>{
    res.send('Bug and Feature Tracking System API is Running')
})


module.exports = app