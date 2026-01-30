const express = require('express');
const app = express();
const port = 5000;

app.set("view engine", "ejs");

app.get('', (req,res)=>{
    res.render('index');
});

app.get('/register', (req,res)=>{
    res.render('register');
});

app.listen(port, ()=>console.info(`App listening on port : http://localhost:${port}`));