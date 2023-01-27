const express = require('express');
const router = express.Router();
const path = require("path");

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./views/index.html"));
  });
  
const friendRoutes = require("./friendsController");
router.use("/friends",friendRoutes);

const petRoutes = require("./petController");
router.use("/pets",petRoutes)

module.exports = router;