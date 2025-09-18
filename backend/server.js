const express = require('express');
const mongoose = require('mongoose');
const user = require('./route/userRoute');
const product = require('./route/productRoutes');
const Order = require('./route/orderRoute');
const cors = require('cors');
const app = express();

mongoose.connect("mongodb+srv://Stanko:MongoDBPass@cluster.shoh0lr.mongodb.net/ShopyKart")
.then(()=>{
    console.log("mongodb connected ... ");
})
.catch((err)=>{
    console.log(err);
});

app.use(express.json({ limit: "10mb" }));
app.use(cors());
app.use(product);
app.use(user);
app.use(Order); 

app.listen(5000,()=>{
    console.log("server on => http://localhost:5000/ ");
})