
const express = require('express');
const path = require('path');
const cookieParser = require("cookie-parser");
const multer = require('multer');
const crypto = require('crypto');

const app = express();
app.set("view engine", "ejs");


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/uploads')
  },
  filename: function (req, file, cb) {
    crypto.randomBytes(12, function(err, bytes){
        const fn = bytes.toString("hex") + path.extname(file.originalname);
       cb(null,fn)
    })
    
  }
})

const upload = multer({ storage: storage })

app.get("/", (req,res)=>{
    res.render("test");
});

app.post("/upload",upload.single("image"), (req,res)=>{
    console.log(req.file);
})

app.listen(3000);