const express = require('express')
const app = express();

const db = require('./db');

const bodyParser = require('body-parser');
app.use(bodyParser.json()); //req.body 

const Person = require('./models/Person');
const Menu = require('./models/Menu');



app.get('/',function(req,res){
    res.send("welcome to batcave")
})


app.get('/menu',async(req,res)=>{
    try{
        const data = await Menu.find();
        console.log('menu data fetched');
        res.status(200).json(data)

    }catch(err){
        console.log(err)
        res.status(500).json({error:'Internal Server Error'})
    }
})

app.post('/menu', async(req,res)=>{
    try{
        const data  = req.body
        const newMenu = new Menu(data);
        const response = await newMenu.save()
        console.log('menu data saved')
        res.status(200).json(response)

    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'})
    }
})



app.get('/person/:workType', async(req,res)=>{
    try{
        // extract the work type from the URL parameter
        const workType = req.params.workType;

        if(workType == 'chef' || workType == 'manager' ||workType == 'waiter'){

            const response  = await Person.find({work:workType});
            console.log('response fetched');
            res.status(200).json(response);

        } else {
            res.status(404).json({errors:'Invalid work type'});
            console.log("Invalid work type")
        }

    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }
})


// post route to add a person
app.post('/person', async(req,res)=>{
    try{
        const data = req.body // assuming the request body contains the person data

        // create a new person document using the mongoose model
        const newPerson = new Person(data);

        // save the new person to the database
        const response = await newPerson.save()
        console.log('data saved')
        res.status(200).json(response)


    } catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});

    }
})

app.get('/person', async(req,res)=>{
    try {
        const data = await Person.find(); 
        console.log('data fetched');
        res.status(200).json(data)
    } catch (error) {
        console.log(err)
        res.status(500).json({error:'Internal Server Error'})
    }
})

app.listen(3000, ()=>{
    console.log('listening on port 3000');
})

