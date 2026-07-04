const express = require('express');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.post('/users', async (req, res)=>{
    try{
        const {name, email, age} = req.body;
        const user = await prisma.user.create({
            data : {name, age, email},
        });
        res.status(201).json(user);
    } catch ( error) {
        res.status(400).json({error : error.message});
    }
});

app.listen(3000, ()=> console.log('Server running on port 3000'));