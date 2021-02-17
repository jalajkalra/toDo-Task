const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const webpush = require('web-push');
const mongoose = require('mongoose');
const userRouter = require("./router/user");
const express = require('express');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

webpush.setVapidDetails("mailto:jalajkalra4@gmail.com","BOdkvAjjRavjvSRlxWDAH_csDa3kv-2dGua6SoUoxqTfgMGx4FcQKKw2elpkh0nxKejhiLz6a2dtsuTwO_wgCYI","XdnoKmNQF61VOsPW3FaeqLyQ2uJK-nuT5o75QqYh0pg");

app.use("/user",userRouter);

app.post("/subscribe",(req,res)=>{
    const subscription = req.body;
    res.status(201).json({});
    const payload = JSON.stringify({title:'This is a reminder'});
    webpush.sendNotification(subscription,payload)
        .catch(err=>console.log(err));
})

if(process.env.NODE_ENV==='production'){
    app.use(express.static('client/build'));

    app.use('*',(req,res)=>{
        res.sendFile(path.join(__dirname,'client','build','index.html'));
    })
}

mongoose.connect("mongodb+srv://Jalaj:AvRtggZAF1xWgfFT@cluster0.km58y.mongodb.net/Aiotize?retryWrites=true&w=majority",{useNewUrlParser: true,useUnifiedTopology:true })
    .then(app.listen(process.env.PORT||5000,()=>console.log("Server Has Started")))
    .catch(err=>console.log(err))