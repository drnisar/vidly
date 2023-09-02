const mongoose = require("mongoose");
const Joi = require("joi");
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const express = require("express");
const app = express();

mongoose
  .connect("mongodb://localhost/vidly")
  .then(() => console.log("Connected to Mongodb"))
  .catch((err) => console.error("Could not connect to MongoDB"));

app.use(express.json());
app.use("/api/genres", genres);
app.use("/api/customers", customers);

var port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
