const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended : true}));
const userModel = require('./models/user');

app.set('view engine',"ejs");

const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req,res)=>{
    res.render('index');
});

app.get("/read",async (req,res)=>{
    let users = await userModel.find()
    res.render("read", {users});
})

app.post("/create",async (req,res)=>{
    let {name,email, image} = req.body;
    let createdUser = await userModel.create({
       // name : req.body.name
       name, // name : name,
       email,
       image,
    });

    res.redirect("/read");
});

app.get("/delete/:id", async (req,res)=>{
    let users = await userModel.findOneAndDelete({_id : req.params.id});
    res.redirect("/read");
})

app.listen(3000, ()=>{
    console.log('server is running');
});