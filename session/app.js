
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

app.get("/login",(req,res)=>{
    req.session.user = "Toasted Avacado";
    res.send("Logged In succesfully");
});

app.get("/profile",(req, res)=>{
    if(req.session.user){
    res.send(`welcome ${req.session.user}`);
    }else {
        res.send("Please create a profile first");
    }
});


app.get("/logout",(req,res)=>{
    req.session.destroy();
    res.send("Logged out successfully");
})



app.listen(PORT, ()=>{
    console.log(`server is running in http://localhost:${PORT}`);
});