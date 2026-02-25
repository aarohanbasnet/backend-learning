const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req,res)=>{
    res.send("Working");
})

app.get("/api/message", (req,res)=>{
    res.status(200).json({
        success : true,
        message : "You made a fullstack project",
        data : {
            time : new Date()
        }
    });
} );

app.listen(PORT, ()=>{
    console.log(`Server running on http://localhost:${PORT}`);
});