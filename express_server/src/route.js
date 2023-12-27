import express from "express";

const app = express();

app.get('/number',(req,res)=>{
    res.send("successful GET !");
});

app.post('/number',(req,res)=>{
    res.send("successful POST !");
})

app.put('/numbers',(req,res)=>{
    res.send("successful PUT !");
})

app.delete('/number',(req,res)=>{
    res.send("successful DELETE!");
})

app.listen('3456',()=>{
    console.log("Server is running on port 3456")
})