 
const express = require('express');
const app = express();

const PORT = 3000;

app.get("/",(req,res)=>{
    res.send("connected");
});

app.get("/users",(req,res)=>{
    console.log(req.query);
    res.send("check console");
});


app.get("/todos", (req,res)=>{
    let {completed, priority} = req.query;
    if(completed === "true"){
        res.send(`Congratulations! You have completed ${priority} priority task`);
    }else{
        res.send(`You have a ${priority} priority task to complete`);
    };
});

app.listen(PORT, ()=>{
    console.log(`server is running in http://localhost:${PORT}`);
});

