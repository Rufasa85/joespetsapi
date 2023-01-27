const express = require('express');
const router = express.Router();
const fs = require("fs")

router.get("/", (req, res) => {
    fs.readFile("./friends.json", "utf-8", (err, data) => {
      if (err) {
        res.status(500).send("oh no!");
        throw err;
      } else {
        const friendsData = JSON.parse(data);
        res.json(friendsData);
      }
    });
  });
  router.post("/", (req, res) => {
    fs.readFile("./friends.json", "utf-8", (err, data) => {
      if (err) {
        res.status(500).send("oh no!");
        throw err;
      } else {
        const friendsData = JSON.parse(data);
        friendsData.push(req.body);
        fs.writeFile("./friends.json", JSON.stringify(friendsData, null, 4), (err) => {
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
    fs.readFile("./friends.json", "utf-8", (err, data) => {
      if (err) {
        res.status(500).send("oh no!");
        throw err;
      } else {
        const friendsData = JSON.parse(data);
        for (let i = 0; i < friendsData.length; i++) {
          const friend = friendsData[i];
          if (friend.id == req.params.id) {
            return res.json(friend);
          }
        }
        return res.send("no such friend");
      }
    });
  });
  
  router.put("/:id", (req, res) => {
    fs.readFile("./friends.json", "utf-8", (err, data) => {
      if (err) {
        res.status(500).send("oh no!");
        throw err;
      } else {
        let friendsData = JSON.parse(data);
        friendsData = friendsData.map((friend) => {
          if (friend.id == req.params.id) {
            return {
              id: req.body.id,
              name: req.body.name,
              isHuman: req.body.isHuman
            };
          } else {
            return friend;
          }
        });
        fs.writeFile("./friends.json", JSON.stringify(friendsData, null, 4), (err) => {
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
    fs.readFile("./friends.json", "utf-8", (err, data) => {
      if (err) {
        res.status(500).send("oh no!");
        throw err;
      } else {
        let friendsData = JSON.parse(data);
        friendsData = friendsData.filter((friend) => {
          if (friend.id == req.params.id) {
            return false;
          } else {
            return true;
          }
        });
        fs.writeFile("./friends.json", JSON.stringify(friendsData, null, 4), (err) => {
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