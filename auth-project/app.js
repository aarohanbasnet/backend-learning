
const express = require('express');
const jwt = require('jsonwebtoken');
const path = require('path');
const cookieParser = require('cookie-parser');

const PORT = 3000;
const app = express();

app.set("view engine", "ejs");
//For working with form
app.use(express.json());
app.use(express.urlencoded({extended : true}));
//To use static file
app.use(express.static(path.join(__dirname,'public')));
//To use cookies
app.use(cookieParser());

app.get("/", (req,res)=>{
    res.render("index");
});

app.listen(PORT, ()=>{
    console.log(`server is running in http://localhost:${PORT}`);
})