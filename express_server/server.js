import express from 'express';

const server = express();

server.get('/msg',(req,res)=>{
    res.send("hello from express!")
})

server.listen(4747,()=>{
    console.log("express server listing on port 4747!");
});