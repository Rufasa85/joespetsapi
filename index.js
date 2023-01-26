const express = require("express");
const app  = express();

const pets=require("./pets.json")

app.get("/",(req,res)=>{
    res.send("<h1>Hello</h1>")
})


app.get("/pets",(req,res)=>{
    res.json(pets)
})

app.get("/pets/:banana",(req,res)=>{
    for (let i = 0; i < pets.length; i++) {
        const pet = pets[i];
        console.log(req.params)
        if(pet.id==req.params.banana){
            return res.json(pet)
        }
    }
    return res.send("no such pet")
})


app.listen(3000,function(){
    console.log("listenin on port 3000!")
})