require('dotenv').config();
const express = require("express");
const jwt = require('jsonwebtoken')
const route = express.Router();
const User = require('../models/User');

route.post('/Connection',async(req,res)=>{
    try {
        const user = await User.findOne({
            email:req.body.input.email,
            password:req.body.input.password
        });
        if(user){
            const token = jwt.sign({ userId: user.id , userFName:user.fname , userLName:user.lname }, process.env.JWT_SECRET, { expiresIn: '15d' });
            return res.status(200).json({ token })
        }else{
            return res.json({message : "User not found"});
        }
    } catch (e) {
        return res.status(500).send({ message : e.message });
    }
});

route.get('/getUserCreds',async(req,res)=>{
    try {
        const User = await User.findOne({__id:req.params.id});
        return res.status(200).json(User);
    } catch (e) {
        return res.status(500).send({ message : e.message });
    }
});

route.post('/CreateUser',async(req,res)=>{
    try {
        const oldUser = await User.find({
            email:req.body.input.email,
        });
        if(oldUser){
            const newUser = new User(req.body.input);
            await newUser.save();
            return res.status(201).send({ message: "User created" });
        }else{
            return res.send({ message : "User already has account" });
        }
    } catch (e) {
        return res.status(500).send({ message : e.message });
    }
});

route.get('/VerifyToken',(req,res)=>{
    const authHeader = req.body.headers['Authorization'];
    const token = authHeader && authHeader.split(' ')[1]; 
    if (token == null) return res.sendStatus(401);  
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        return res.json({"verified":true})
    });
})


route.put('/ModifyUserCreds',async(req,res)=>{
    try{
        const User = await User.findOne({ __id : req.params.id});
        if(User.length === 0){
            return res.status(404).send({ message : "not found" });
        }else{
            const result = await User.updateOne({ __id : id,$set : req.body });
            if(result.modifiedCount === 1){
                return res.status(200).send({ message : "modification successfull" });
            }else{
                return res.status(405).send({ message : "not modified" });
            }
        }
    }catch(e){
        return res.status(500).send({ message : e.message});
    }
});

route.delete('/DeleteAccount',async(req,res)=>{
    const id = req.params.id;
    try {
        const result = await User.deleteOne({ _id: id });
        if (result.deletedCount === 1) {
            return res.status(200).send({ message: 'Data deleted successfully' });
        } else {
            return res.status(404).send({ message: 'Data not found' });
        }
    } catch (e) {
        return res.status(500).send({ message : e.message });
    }
});

module.exports = route;