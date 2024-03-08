const express = require('express');
const router = express.Router();
const Person = require('../models/Person');
const {jwtAuthMiddleware, generateToken} = require('../jwt')
router.post('/signup', async(req,res)=>{
    try{
        const data = req.body // assuming the request body contains the person data

        // create a new person document using the mongoose model
        const newPerson = new Person(data);

        // save the new person to the database
        const response = await newPerson.save()
        console.log('data saved')

        const payload ={
            id: response.id,
            username:response.username
        } 

        console.log(JSON.stringify(payload));

        const token = generateToken(payload);
        console.log("Token is : ", token);

        res.status(200).json({response:response, token:token});


    } catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});

    }
})


// login Route
router.post('/login',async(req,res)=>{
    try {
        
        //Extract ussername and password from request body

        const {username, password} = req.body;

        //find the user by username
        const user  = await Person.findOne({username:username})

        //if user does not exist or password does not match, return error

        if(!user || !(await user.comparePassword(password))){
            return res.status(401).json({error:'Invalid username or password'});
        }

        //generate token
        const payload = {
            id : user.id,
            username : user.username
        }
        const token = generateToken(payload);

        //return token as response
        res.json({token})

    } catch (error) {
        console.log(error)
        res.status(500).json({error:'Internal Server Error'});
    }
})

router.get('/', jwtAuthMiddleware ,async(req,res)=>{
    try {
        const data = await Person.find(); 
        console.log('data fetched');
        res.status(200).json(data)
    } catch (error) {
        console.log(err)
        res.status(500).json({error:'Internal Server Error'})
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





module.exports = router;