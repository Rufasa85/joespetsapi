const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

const petRoutes = require("./controllers/petController")
app.use("/pets",petRoutes)

const friendRoutes = require("./controllers/friendsController")
app.use("/friends",friendRoutes)

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/index.html"));
});


app.listen(3000, function () {
  console.log("listenin on port 3000!");
});
