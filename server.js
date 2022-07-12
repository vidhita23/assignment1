const express = require("express");
const bodyParser = require("body-parser");
//require("dotenv").config();
const app = express();
const port = 3000;
const { query } = require("express");
const apiRouter = require("./Routes/routes");

//app.use(bodyParser.json()); //body-parser extracts the entire body portion of an incoming request stream and exposes it on req.body

app.use(apiRouter);

app.use((req, res, next) => {
  res.status(404).json({
    error: "URL not found",
  });
});

app.listen(port, function () {
  console.log(`Listening on ${port}`);
});
