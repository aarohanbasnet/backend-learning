import express from "express";
import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from './generated/prisma/client';

const adapter = new PrismaPg({ connectionString : process.env.DATABASE_URL});
const prisma = new PrismaClient({adapter});

const app = express();
app.use(express.json());

app.post('/users', async( req, res)=>{
    try{
        const {name, email, age} = req.body;
        const user = await prisma.user.create({
            data : {name, email, age },
        });
         res.status(201).json({
            success : true,
            message : "User created successfully",
            data : user,
         });
    } catch (err) {
        res.status(400).json({
            success : false, 
            message : err.message,
            data : null,
        });
    };
});


app.get("/users", async(req, res)=> {
    try{
        const users = await prisma.user.findMany();
        res.status(200).json({
            success : true,
            message : "User fetched successfully",
            data : users,
        });
    } catch(err){
        res.status(500).json({
            success : false,
            message : err.message,
            data : null,
        });
    }
})


app.listen(3000, ()=>{
    console.log("server running on port 3000");
});
