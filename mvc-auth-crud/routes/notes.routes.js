const express = require('express');
const router = express.Router();

router.get("/", (req,res)=>{
    res.status(200).json({
        "status" : "success",
        "message" : "viewing notes"
    });
});

router.post("/", (req,res)=>{
    res.status(200).json({
        "status" : "success",
        "message" : "creating note"
    });
});

router.put('/:id', (req, res)=>{
    res.status(200).json({ 
        "status" : "success",
        "message" : "editing note"
    });
});

module.exports = router;