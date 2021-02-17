const express = require('express');
const router = express.Router();
const Student = require('../modal/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const middleware = require("../middleware/middleware");

router.post('/registration',async(req,res)=>{
    try{
        let errors = [];
        if(!validator.isEmail(req.body.email)){
            errors.push({message:"Email is not valid"});
        }
        if(validator.isEmpty(req.body.password) || !validator.isLength(req.body.password,{min:5})){
            errors.push({message:"Password is not valid"});
        }
        if(errors.length>0){
            const error = new Error("Invalid input.");
            error.data = errors;
            error.code = 422;
            throw error
        }
    const user = await Student.find({email:req.body.email});
    if(user.length>0){
        return res.status(403).json({error:"User Already Exists !!!"})
    }
     
    const hashPassword = await bcrypt.hash(req.body.password,12);
    const newUser = new Student({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.email,
        password:hashPassword,
        toDo:[]
    })
    const result = await newUser.save();
    const token = await jwt.sign({userId:result._id,email:result.email},"somesupersecretkey")
    return res.status(200).json({token,message:'success'});
    }catch(err){
        console.log(err);
        res.status(404).json({message:'fail'});
    }
})

router.post('/login',async(req,res)=>{
    try{
        const user  = await Student.findOne({email:req.body.email});
        if(!user){
            return res.json({error:'Wrong Credentials!!!'});
        }
        const isEqual = await bcrypt.compare(req.body.password,user.password);
        if(!isEqual){
            return res.status(403).json({error:'Wrong Credentials!!!'});
        }
        const token = jwt.sign({userId:user._id,email:user.email},"somesupersecretkey")
        return res.status(200).json({token,message:'success'});
    }catch(e){
        console.log(e);
        res.status(404).json({message:'fail'});
    }
})


router.get("/checkAuthState",middleware,async(req,res)=>{
    if(req.isAuth){
        try{
            const user = await Student.findById(req.userId);
            if(user){
                return res.status(200).json({message:'success'});     
            }
            return res.status(200).json({error:"No Data Found !!!"});
        }catch(err){
            console.log(err);
            res.json({message:'fail'});
        }
    }else{
        res.json({message:'fail'});
    }
})

router.post('/addTodo',middleware,async(req,res)=>{
    if(req.isAuth){
        console.log(req.userId);
        try{
            let data = {
                task:req.body.item,
                important:"No",
                Status:"Pending",
                description:'',
                DeadlineDate:'',
                DeadlineTime:''
            };
            const user  = await Student.updateOne({_id:req.userId},{$push:{toDo:data}});
            if(!user){
                return res.json({error:'No Such User Present!!!'});
            }
            data = user.toDo;
            return res.status(200).json({message:'success'});
        }catch(e){
            console.log(e);
            res.status(404).json({message:'fail'});
        }
    }else{
        console.log("Not a valid Token");
    }
})

router.post('/updateTodo',middleware,async(req,res)=>{
    if(req.isAuth){
        try{
            await Student.updateOne({"_id":req.userId,"toDo.task":req.body.task},{$set:{"toDo.$.task":req.body.task,"toDo.$.important":req.body.important,"toDo.$.status":req.body.status,"toDo.$.deadlineDate":req.body.date!=undefined?req.body.date:'',"toDo.$.deadlineTime":req.body.time!=undefined?req.body.time:'',"toDo.$.description":req.body.description}});
            return res.status(200).json({message:'success'});
        }catch(e){
            console.log(e);
            res.status(404).json({message:'fail'});
        }
    }else{
        console.log("Not a valid Token");
    }
})

router.post('/deleteTodo',middleware,async(req,res)=>{
    if(req.isAuth){
        try{
            await Student.updateOne({"_id":req.userId},{$pull:{toDo:{task:req.body.task}}});
            return res.status(200).json({message:'success'});
        }catch(e){
            console.log(e);
            res.status(404).json({message:'fail'});
        }
    }else{
        console.log("Not a valid Token");
    }
})

router.get('/getTodo',middleware,async(req,res)=>{
    if(req.isAuth){
        try{
            let data = [];
            const user  = await Student.findById(req.userId);
            if(!user){
                return res.json({error:'No Such User Present!!!'});
            }
            data = user.toDo;
            return res.status(200).json({data,message:'success'});
        }catch(e){
            console.log(e);
            res.status(404).json({message:'fail'});
        }
    }else{
        console.log("Not a valid Token");
    }
})

router.get('/getTodo/:id',middleware,async(req,res)=>{
    if(req.isAuth){
        try{
            let data = [];
            const user  = await Student.findById(req.userId);
            if(!user){
                return res.json({error:'No Such User Present!!!'});
            }
            data = user.toDo[req.params.id];
            return res.status(200).json({data,message:'success'});
        }catch(e){
            console.log(e);
            res.status(404).json({message:'fail'});
        }
    }else{
        console.log("Not a valid Token");
    }
})

module.exports = router;