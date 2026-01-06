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


app.get("/create/post", async(req,res)=>{

    let post = await postModel.create({
        postdata : "Hello my first post",
        user : "695d53dcc9d5b46486841e52"
    })

    let user = await userModel.findOne({_id : "695d53dcc9d5b46486841e52"});
    user.posts.push(post._id);
    await user.save();
    res.send({post, user});

})


app.listen(PORT, ()=>{
    console.log(`server is running in http://localhost:${PORT}`);
});