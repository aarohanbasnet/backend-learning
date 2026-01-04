
const express = require('express');
const jwt = require('jsonwebtoken');
const path = require('path');
const cookieParser = require('cookie-parser');
const userModel = require('./models/usermodel');
const bcrypt = require('bcrypt');
const usermodel = require('./models/usermodel');

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

app.post("/create", (req,res)=>{
    let {username, email, age, password} = req.body;

    bcrypt.genSalt(10, function(err,salt){
        bcrypt.hash(password,salt, async (err, hash)=>{
            let createdUser = await userModel.create({
                username,
                email,
                password : hash,
                age
            });

           
            res.send(createdUser);
        });
    }) ;


});

app.get("/logout", (req,res)=>{
    res.cookie("token", "");
    res.redirect("/");
});

app.get("/login", (req,res)=>{
    res.render("login");
})

app.post("/login", async (req,res)=>{
    let user = await userModel.findOne({email : req.body.email});
    if(!user) return res.send("credentials doesn't match");
    bcrypt.compare(req.body.password, user.password,(err, result)=>{
        if(result){
             let token = jwt.sign({email : user.email},"granted");
            res.cookie("token", token);
            res.send("Logged in succesfully");
        }else {
            res.send("Something is wrong");
        }
    })

})
 
app.listen(PORT, ()=>{
    console.log(`server is running in http://localhost:${PORT}`);
});