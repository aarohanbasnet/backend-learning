const express = require("express");
const userModel = require("./models/user");
const postModel = require("./models/post");

const app = express();


const PORT = 3000;

app.get("/", (req,res)=>{
    res.send("working")
});

app.get("/create",async function(req,res){
    let user = await userModel.create({
        username : "Aarohan",
        age : 25,
        email  : "toastaaro@gmail.com"
    });

    res.send(user);
})


app.listen(PORT, ()=>{
    console.log(`server is running in http://localhost:${PORT}`);
});