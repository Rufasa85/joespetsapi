const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

const allRoutes = require("./controllers");
app.use(allRoutes)

app.listen(PORT, function () {
  console.log("listenin on port " + PORT);
});
