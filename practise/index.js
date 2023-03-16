const express = require("express");
const db = require("./config/mongoose");
const port = 2000;
const app = express();
const parser = require("body-parser");
const cors = require("cors")
const error = require('./helpers/errorHandling');


app.use(cors())
app.use(parser.urlencoded({ extended: false }));
app.use(express.static("./assets"));
app.use(express.json());


app.set("view engine", "ejs");
app.set("views", "./views");
app.use(error.handleError);

app.use("/", require("./routes/index"));

app.listen(port, function (err) {
  if (err) {
    console.log("err", err);
    return;
  }
  console.log("server is running on ", port);
});
