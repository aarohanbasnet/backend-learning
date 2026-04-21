const express = require("express");
const router = express.Router();

const {register, login, refresh} = require("../controllers/auth.controller");
const verifyAccessToken = require("../middlewares");

router.post("/login", login);
router.post("/refresh", refresh);

router.get("/me", verifyAccessToken, (req, res)=>{
    res.json({msg : `Welcome ${req.user.id}` });
});

module.exports = router;