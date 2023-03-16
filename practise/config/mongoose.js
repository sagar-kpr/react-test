const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://manishkpr:sagar123@cluster0.xelx48p.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("mongoose connected");
  });
