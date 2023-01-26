fetch("/pets").then(res=>res.json()).then(data=>{
    console.log(data)
    data.forEach(pet=>{
        const myLi = document.createElement("li");
        myLi.textContent = `${pet.id}: ${pet.owner}'s ${pet.species} called ${pet.name}`
        document.querySelector("#petList").append(myLi)
    })
})