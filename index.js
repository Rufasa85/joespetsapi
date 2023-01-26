const express = require("express");
const app  = express();
const path = require("path")

const pets=require("./pets.json")


app.use(express.static("public"))

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"./views/index.html"))
})

app.get("/pets",(req,res)=>{
    res.json(pets)
})


app.get("/pets/:id",(req,res)=>{
    for (let i = 0; i < pets.length; i++) {
        const pet = pets[i];
        console.log(req.params)
        if(pet.id==req.params.id){
            return res.json(pet)
        }
    }
    return res.send("no such pet")
})

app.listen(3000,function(){
    console.log("listenin on port 3000!")
})