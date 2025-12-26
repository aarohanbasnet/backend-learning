
const express = require('express')
const app = express()
const userModel = require('./usermodel')


app.get("/", (req,res)=>{
    res.send("hello");
})

//CREATION

app.get("/create", async (req,res)=>{
     let createdUser = await userModel.create({
        name : "John Doe",
        username : "johnsays69",
        email : "doeehn@gmail.com",
        age : 26
    })

    res.send(createdUser);
})

//UPDATE
app.get("/update", async (req,res)=>{
    let updatedUser = await userModel.findOneAndUpdate({username : "jailedSamauy"}, {username : "John Doe"}, {new : true})

    res.send(updatedUser);
})


//READ

app.get("/read", async (req,res)=>{
    let users = await userModel.find()
    res.send(users)
})

//DELETE

app.get("/delete", async (req,res)=>{
   let deletedUser = await userModel.findOneAndDelete({ username: "jailedSamauy" });

    res.send(deletedUser);
})


app.listen(3000, ()=>{
    console.log("server is running");
})
