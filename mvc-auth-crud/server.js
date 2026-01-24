const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/connection');
const noteRoutes = require('./routes/notes.routes');
const authRoutes = require('./routes/auth.routes');

dotenv.config();  //load ,env first

const app =express();

connectDB(); //database connection
app.use(express.json());

//API routes
app.use('/notes', noteRoutes);
app.use('/auth', authRoutes);


const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log(`Server running at http://localhost:${PORT}`);
});