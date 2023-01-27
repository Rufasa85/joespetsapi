const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

const allRoutes = require("./controllers");
app.use(allRoutes)

app.listen(3000, function () {
  console.log("listenin on port 3000!");
});
