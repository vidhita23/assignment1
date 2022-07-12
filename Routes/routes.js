const express = require("express");
const app = express();
const {getData} = require("../Controllers/api");


app.get("/data", getData);

module.exports = app;