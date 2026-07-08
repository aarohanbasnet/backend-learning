import express from "express";
import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from './generated/prisma/client';

const adapter = new PrismaPg({ connectionString : process.env.DATABASE_URL});
const prisma = new PrismaClient({adapter});

const app = express();
app.use(express.json());


//CREATE USER
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



//GET ALL USERS
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



//GET SINGLE USER
app.get('/users/:id', async(req, res)=>{
    try{
        const user = await prisma.user.findUnique({
        where : {id : req.params.id },
    });

    if(!user){
        return res.status(404).json({
            success : false,
            message : 'User not found',
            data : null,
        });
    }

    res.status(200).json({
        success : true,
        message : ' User fetched successfully',
        data : user,
    });
    } catch (err){
        res.status(500).json({
            success : false,
            message : err.message,
            data : null,
        })
    }
});


//UPDATE 
app.put('/users/:id', async(req, res)=>{      //put for all changes patch for partial changes
    try{
        const {name, email, age} =req.body;
        const user = await prisma.user.update({
            where : { id : req.params.id},
             data : {name, email, age }
        });
      res.status(200).json({
        success : true,
        message : "User updated successfully",
        data : user,
      }) ;
    }catch(err){
        res.status(500).json({
            success : false,
            message : err.message,
            data : null,
        });
    }
});
//DELETE 
app.delete('/users/:id', async(req, res)=>{
    try{
        await prisma.user.delete({where : { id : req.params.id}});
        res.status(200).json({
            success : true,
            message : "User deleted successfully",
            data : null,
        });
    } catch (err) {
        res.status(400).json({
            success : false,
            message : err.message,
            data : null,
        });
    }
});


//IMPLEMENTING REFERENCING
app.post('/posts', async (req, res)=>{
    try{
        const {title, content, authorId} = req.body;
        const post = await prisma.post.create({
            data : {
                title,
                content,
                authorId,
            },
        });

        res.status(201).json({
            success : true,
            message : "Post created successfully",
            data : post,
        });
    }catch (err){
        res.status(500).json({
            success : false,
            message : err.message,
            data :null,
        });
    }
})



//GET ALL POSTS
app.get("/posts", async(req, res)=>{
    try{
        const posts = await prisma.post.findMany({
            include : {
                author : true,
            }
        });
        res.status(200).json({
            success : true,
            message : "Posts fetched successfully",
            data : posts
        });

    } catch(err){
        res.status(500).json({
            success: false,
            message: err.message,
            data: null
        });
    };
});


app.listen(3000, ()=>{
    console.log("server running on port 3000");
});
