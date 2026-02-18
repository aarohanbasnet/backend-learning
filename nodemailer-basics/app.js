const express = require('express');
const mailRoutes = require('./routes/mailRoutes')

const app = express();
const PORT = 5000;


app.use(express.json());

app.use('/api/mail', mailRoutes);

app.listen(PORT, ()=>{
    console.log(`Server running http://localhost:${PORT}`);
})


