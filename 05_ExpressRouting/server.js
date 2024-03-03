const express = require('express')
const app = express();

const db = require('./db');

const bodyParser = require('body-parser');
app.use(bodyParser.json()); //req.body 



app.get('/',function(req,res){
    res.send("welcome to batcave")
})



// Import the router files
const personRoutes = require('./routes/personRoutes');

app.use('/person',personRoutes);

const menuRoutes = require('./routes/menuRoutes');

app.use('/menu',menuRoutes);


app.listen(3000, ()=>{
    console.log('listening on port 3000');
})

