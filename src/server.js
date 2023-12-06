const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const router =require("./routes");
require('dotenv').config();


const server = express();
server.use(express.json());
server.use(express.urlencoded({extended: true}))
server.use(cors());
server.use(morgan("dev"));
server.use((req,res, next)=>{
    console.log(req); 
    next();
});

server.use(router); 
server.use(express.static('src'));


module.exports = server;