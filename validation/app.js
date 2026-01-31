const express = require('express');
const {check, validationResult} = require('express-validator');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.set("view engine", 'ejs');


app.get('/', (req,res)=>{
    res.render('index');
});

app.get('/register',(req, res)=>{
    res.render('register');
});

app.post('/register',[
        check('username')
        .notEmpty().withMessage("Username is required")
        .isLength({min : 3, max : 20}).withMessage("username must be between 3 and 20 characters"),
        
        check('email')
        .notEmpty().withMessage("Email required")
        .isEmail().withMessage("Invalid Email"),
    
        check("password")
        .notEmpty().withMessage("Password is required")
        .isLength({min : 6}).withMessage("Min 6 characters")
        .matches(/(?=.*[a-z])(?=.*[A-Z])/)
        .withMessage('password must contain at least one uppercase and lowecase letter'),
    
        check('password1')
        .custom((value, {req}) =>{
            return value === req.body.password;
        }).withMessage("Password do not match")],

    

    (req, res)=>{
            const errors = validationResult(req);

            if(!errors.isEmpty()){
                return res.send(errors.array());
            }
            
            res.send("username valid");

})

app.listen(port, ()=>console.info(`App listening on port : http://localhost:${port}`));