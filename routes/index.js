const express = require("express");

// Import routers for notes
const noteRouter = require("./notes");

const app = express();
app.use("/notes", noteRouter);

module.exports = app;
