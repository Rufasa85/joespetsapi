const express = require('express');
const router = express.Router();
const fs = require("fs")

router.get("/", (req, res) => {
    fs.readFile("./pets.json", "utf-8", (err, data) => {
      if (err) {
        res.status(500).send("oh no!");
        throw err;
      } else {
        const petsData = JSON.parse(data);
        console.log("here are the pets!")
        console.log(petsData)
        res.json(petsData);
      }
    });
  });
  
  router.post("/", (req, res) => {
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
  
  router.get("/:id", (req, res) => {
    fs.readFile("./pets.json", "utf-8", (err, data) => {
      if (err) {
        res.status(500).send("oh no!");
        throw err;
      } else {
        const petsData = JSON.parse(data);
        for (let i = 0; i < petsData.length; i++) {
          const pet = petsData[i];
          if (pet.id == req.params.id) {
            return res.json(pet);
          }
        }
        return res.send("no such pet");
      }
    });
  });
  
  router.put("/:id", (req, res) => {
    fs.readFile("./pets.json", "utf-8", (err, data) => {
      if (err) {
        res.status(500).send("oh no!");
        throw err;
      } else {
        let petsData = JSON.parse(data);
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
        fs.writeFile("./pets.json", JSON.stringify(petsData, null, 4), (err) => {
          if (err) {
            res.status(500).send("oh no!");
            throw err;
          } else {
            res.send("data updated!");
          }
        });
      }
    });
  });
  
  router.delete("/:id", (req, res) => {
    fs.readFile("./pets.json", "utf-8", (err, data) => {
      if (err) {
        res.status(500).send("oh no!");
        throw err;
      } else {
        let petsData = JSON.parse(data);
        petsData = petsData.filter((pet) => {
          if (pet.id == req.params.id) {
            return false;
          } else {
            return true;
          }
        });
        fs.writeFile("./pets.json", JSON.stringify(petsData, null, 4), (err) => {
          if (err) {
            res.status(500).send("oh no!");
            throw err;
          } else {
            res.send("data deleted!");
          }
        });
      }
    });
  });

module.exports = router;