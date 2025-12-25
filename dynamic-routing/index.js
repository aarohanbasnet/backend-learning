
const express = require('express');
const path = require("path");
const app = express();

app.set("view engine","ejs");

app.use(express.static(path.join(__dirname,"public")));

app.get("/", (req,res)=>{
    res.render("index")
})

app.get("/home", function(req,res){
    res.render("index")
})

app.get("/profile", function(req,res){
    res.send("This is profile page")
})

app.get("/profile/:username", function(req,res){
    res.send("welcome "+ req.params.username)
})

app.get("/author/:profile/:username/:age", function(req,res){
    res.send(`Author with ${req.params.username} exists having age ${req.params.age}`)
})

app.listen(3000,()=>{
    console.log("server is running")
})