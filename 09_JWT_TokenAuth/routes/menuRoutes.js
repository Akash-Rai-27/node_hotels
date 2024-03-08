const express = require('express');
const router = express.Router();
const Menu = require('../models/Menu')

router.get('/',async(req,res)=>{
    try{
        const data = await Menu.find();
        console.log('menu data fetched');
        res.status(200).json(data)

    }catch(err){
        console.log(err)
        res.status(500).json({error:'Internal Server Error'})
    }
})


router.get('/:tasteType', async(req,res)=>{
    const tasteType = req.params.tasteType;

    try{

        if(tasteType == 'sweet' || tasteType == 'sour' || tasteType == 'spicy'){
            const response = await Menu.find({taste:tasteType});
            console.log('response on taste fetched');
            res.status(200).json(response);
        }
        else{
            res.status(404).json({error:"Invalid taste type"})
            console.log('Invalid taste type')
        }

    }catch(err){
            console.log(err)
            res.status(500).json({error:"Internal Server Error"})

    }
})


router.post('/', async(req,res)=>{
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


router.put('/:id', async(req,res)=>{
    try {
        const updatedMenuData = req.body
        const personId = req.params.id;
        const response = await Menu.findByIdAndUpdate(personId, updatedMenuData, {
            new:true,
            runValidatord: true,
        })
        if(!response){
            console.log("Menu id is not found")
                return res.status(404).json({error:"Menu id not valid"});
        }
        console.log("data is updated")
        res.status(200).json(response)

    } catch (error) {
        console.log("Internal server error")
        res.status(500).json({error:"Internal server error"})
    }
})

router.delete('/:id', async(req,res)=>{
    try {
        const personId = req.params.id;
        const response = await Menu.findByIdAndDelete(personId)
        if(!response){
            console.log("menu id not found")
                return res.status(404).json({error:"Menu id not found"});
        }
        console.log("Menu deleted")
        res.status(200).json({message:"menu item deleted"})

    } catch (error) {
        console.log("Internal server error")
        res.status(500).json({error:"internal server error"})
    }
})

module.exports = router;
