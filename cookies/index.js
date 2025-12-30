
const express = require('express');
const cookieParser = require('cookie-parser');
const PORT = 3000;

const app = express();
app.use(cookieParser());

app.get("/", (req,res)=>{
    res.cookie('name','yummy-cookie');
    res.send("Hello World");
});

app.get("/fetch", (req,res)=>{
    console.log(req.cookies);
    res.send("API Fetched");
});

app.listen(PORT, ()=>{
    console.log(`server is running in http://localhost:${PORT}`)
});