const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/index.html"));
});

app.get("/pets", (req, res) => {
  fs.readFile("./pets.json", "utf-8", (err, data) => {
    if (err) {
      res.status(500).send("oh no!");
      throw err;
    } else {
      const petsData = JSON.parse(data);
      res.json(petsData);
    }
  });
});

app.post("/pets", (req, res) => {
  fs.readFile("./pets.json", "utf-8", (err, data) => {
    if (err) {
      res.status(500).send("oh no!");
      throw err;
    } else {
      const petsData = JSON.parse(data);
      petsData.push(req.body);
      fs.writeFile("./pets.json", JSON.stringify(petsData, null, 4), (err) => {
        if (err) {
          res.status(500).send("oh no!");
          throw err;
        } else {
          res.send("data added!");
        }
      });
    }
  });
});

app.get("/pets/:id", (req, res) => {
  for (let i = 0; i < petsData.length; i++) {
    const pet = petsData[i];
    if (pet.id == req.params.id) {
      return res.json(pet);
    }
  }
  return res.send("no such pet");
});

app.put("/pets/:id", (req, res) => {
  petsData = petsData.map((pet) => {
    if (pet.id == req.params.id) {
      return {
        id: req.body.id,
        name: req.body.name,
        species: req.body.species,
        owner: req.body.owner,
      };
    } else {
      return pet;
    }
  });
  res.send("updated");
});

app.delete("/pets/:id", (req, res) => {
  petsData = petsData.filter((pet) => {
    if (pet.id == req.params.id) {
      return false;
    } else {
      return true;
    }
  });
  res.send("pet deleted!");
});

app.listen(3000, function () {
  console.log("listenin on port 3000!");
});
