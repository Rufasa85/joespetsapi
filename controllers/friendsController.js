const express = require('express');
const router = express.Router();
const fs = require("fs")

router.get("/", (req, res) => {
    fs.readFile("./friends.json", "utf-8", (err, data) => {
      if (err) {
        res.status(500).send("oh no!");
        throw err;
      } else {
        const petsData = JSON.parse(data);
        res.json(petsData);
      }
    });
  });
  

module.exports = router;