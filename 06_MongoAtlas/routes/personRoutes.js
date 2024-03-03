const express = require('express');
const router = express.Router();
const Person = require('../models/Person');

router.post('/', async(req,res)=>{
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

router.get('/:workType', async(req,res)=>{
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


router.put('/:id',async (req,res)=>{
    try{

        const personId = req.params.id // extract the id from the url parameter
        const updatedPersonData = req.body; // updated data for the person

        const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
            new:true, // return the updated document
            runValidators:true, // Run Mongoode validation
        })
        
        if(!response) {
            return res.status(404).json({error:'Person not found'});
        }

        console.log('data updated');
        res.status(200).json(response);
    }
    catch(err){
            console.log(err)
            res.status(500).json({err:"Internal Serval Error"})
    }
})

router.delete('/:id', async (req,res)=>{
    try{

        const personId = req.params.id
        const response = await Person.findByIdAndDelete(personId);

        if(!response){
            return res.status(404).json({error:"person not found"})
        }

        console.log("data deleted successfully")
        res.status(200).json({message:"deleted data successfully"})

    }catch(errpr){

        console.log(error)
        res.status(500).json({error:"Internal server error"})

    }
})



router.get('/', async(req,res)=>{
    try {
        const data = await Person.find(); 
        console.log('data fetched');
        res.status(200).json(data)
    } catch (error) {
        console.log(err)
        res.status(500).json({error:'Internal Server Error'})
    }
})

module.exports = router;