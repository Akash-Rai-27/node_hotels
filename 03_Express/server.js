const express = require('express')
const app = express();

app.get('/',function(req, res){
    res.send("hello world")
})

app.get('/chicken',(req,res)=>{
    const chickens = {
        name:"butter chicken",
        size:"medium",
        is_salad: true,
        is_extraButter:true
    }
    res.send(chickens)
})

app.get('/dal',(req,res)=>{

    res.send('here is dal you ordered sir')
})

app.listen(3000,()=>{
    console.log('Listening on port 3000')
})