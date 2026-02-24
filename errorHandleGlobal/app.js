const express = require("express");
const app = express();

const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({extended : true}));

//error route
app.get('/test', (req, res, next)=>{
    const error = new Error('Something went wrong');
    error.statusCode = 400;
    next(error); //passes error to global handler
});



//Error handler , takes 4 params
app.use((err, req, res, next) =>{
    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        status : 'error',
        message : err.message || "Internal server error",
        // //Stack trace tells where err occured, which functions were called before it, the exact file and line num
        // stack : process.env.NODE_ENV === "development" ? err.stack : undefined
    })
})


app.listen(PORT, ()=>{
    console.log(`server running : http://localhost:${PORT}`);
})