
const express = require('express');
const session = require('express-session');

const app = express();
const PORT = 3000;

app.use(session({
    secret : "sample-secret",
    resave : false,             //session will not be saved again and again once any change in session is experienced
    saveUninitialized : false   //prevents empty session
}));


app.get("/", (req, res)=>{
    res.send("Welcome");
});


app.get('/visit', (req,res)=>{
    if(req.session.page_views){
        req.session.page_views ++;
        res.send(`You visited this page ${req.session.page_views} times`);
    } else {
        req.session.page_views = 1;
        res.send("Welcome to this page for the first time! ")
    }
});

app.get("/remove-visit", (req,res)=>{
    req.session.destroy();
    res.send("SESSION REMOVED");
});


app.listen(PORT, ()=>{
    console.log(`server is running in http://localhost:${PORT}`);
});