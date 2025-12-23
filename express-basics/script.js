
const express = require('express');
const app = express();

app.use((req, res, next)=>{
    console.log("middleware run succesfully")
    next()
})

app.get('/',(req,res)=>{
    res.send("Hello world")
})

app.get('/profile', (req,res)=>{
    res.send("Welcome to your profile Aarohan")
})

app.listen(3000);