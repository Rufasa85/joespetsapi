fetch("/pets").then(res=>res.json()).then(data=>{
    console.log(data)
    data.forEach(pet=>{
        const myLi = document.createElement("li");
        myLi.textContent = `${pet.id}: ${pet.owner}'s ${pet.species} called ${pet.name}`
        document.querySelector("#petList").append(myLi)
    })
})

document.querySelector("#addPetForm").addEventListener("submit",e=>{
    e.preventDefault();
    const newPetObj = {
        id:parseInt(document.querySelector("#petId").value),
        name:document.querySelector("#petName").value,
        species:document.querySelector("#petSpecies").value,
        owner:document.querySelector("#petOwner").value,
    }
    console.log(newPetObj)
    fetch("/pets",{
        method:"POST",
        body:JSON.stringify(newPetObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        console.log(res)
        if(res.ok){
           location.reload()
        } else {
            alert("trumpet sound")
        }
    })
})