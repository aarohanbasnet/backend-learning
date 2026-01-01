
const express = require('express');
const bcrypt = require('bcrypt');

const app = express();
const PORT = 3000;

app.get("/", (req,res)=>{
    bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash("testPasswo@d", salt, function(err, hash) {
        console.log(hash);
        //$2b$10$.R8KaX1YAF3K3VQHlEP01OTqsLrUFFIOHei0IJJvxXhOB.Qe4Wf/2
        //testPasswo@d
    });
});
    res.send("Working");
})

app.get("/check", (req,res)=>{
    // Load hash from your password DB.
bcrypt.compare("testPasswo@d", "$2b$10$.R8KaX1YAF3K3VQHlEP01OTqsLrUFFIOHei0IJJvxXhOB.Qe4Wf/2", function(err, result) {
    res.send(result);
});
})

app.listen(PORT, ()=>{
    console.log(`server is running in http://localhost:${PORT}`);
})