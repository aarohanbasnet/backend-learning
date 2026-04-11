const express = require("express");
const cookieParser = require("cookie-parser");
const connectDB = require("./db");


const app = express();
connectDB();

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookieParser());

//app.use("api/v1/auth");

module.exports = app;