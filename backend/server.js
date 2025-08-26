const express = require('express');
const mongoose = require('mongoose');
const router = require('./route/userRoute');
const cors = require('cors');
const app = express();

mongoose.connect("mongodb+srv://Stanko:MongoDBPass@cluster.shoh0lr.mongodb.net/ShopyKart")
.then(()=>{
    console.log("mongodb connected ... ");
})
.catch((err)=>{
    console.log(err);
});

app.use(express.json());
app.use(cors());
app.use(router);

app.listen(5000,()=>{
    console.log("server on => http://localhost:5000/ ");
})