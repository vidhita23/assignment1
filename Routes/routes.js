const express = require("express");
const app = express();
const {getData} = require("../Controllers/api");


app.get("/getTimeStories", getData);

module.exports = app;
