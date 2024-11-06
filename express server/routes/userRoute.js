require('dotenv').config();
const express = require("express");
const route = express.Router();
const User = require('../models/User');
route.get('/',(req,res)=>{
    res.send("hello world");
})
route.get('/Connection',async(req,res)=>{
    try {
        const user = await User.findOne({
            email:req.body.email,
            password:req.body.password
        });
        if(user.length === 0){
            res.status(404).json({message : "User not found"});
        }else{
            res.status(200).json(user)
        }
    } catch (e) {
        res.status(500).send({ message : e.message });
    }
});

route.get('/getUserCreds/:id',async(req,res)=>{
    try {
        const User = await User.findOne({__id:req.params.id});
        res.status(200).json(User);
    } catch (e) {
        res.status(500).send({ message : e.message });
    }
});

route.post('/CreateUser',async(req,res)=>{
    try {
        const oldUser = await User.find({
            email:req.body.email,
        });
        if(oldUser.length == 0){
            const newUser = new User(req.body);
            await newUser.save();
            res.status(201).send({ message: "User created" });
        }else{
            res.status(500).send({ message : "User already has account" });
        }
    } catch (e) {
        res.status(500).send({ message : e.message });
    }
});

route.put('/ModifyUserCreds/:id',async(req,res)=>{
    try{
        const User = await User.findOne({ __id : req.params.id});
        if(User.length === 0){
            res.status(404).send({ message : "not found" });
        }else{
            const result = await User.updateOne({ __id : id,$set : req.body });
            if(result.modifiedCount === 1){
                res.status(200).send({ message : "modification successfull" });
            }else{
                res.status(405).send({ message : "not modified" });
            }
        }
    }catch(e){
        res.status(500).send({ message : e.message});
    }
});

route.delete('/DeleteAccount/:id',async(req,res)=>{
    const id = req.params.id;
    try {
        const result = await User.deleteOne({ _id: id });
        if (result.deletedCount === 1) {
            res.status(200).send({ message: 'Data deleted successfully' });
        } else {
            res.status(404).send({ message: 'Data not found' });
        }
    } catch (e) {
        res.status(500).send({ message : e.message });
    }
});

module.exports = route;