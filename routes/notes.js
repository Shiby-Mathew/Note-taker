const notes = require("express").Router();
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require("../helpers/fsUtils");

//GET route for retriving all the notes
//notes.get();
notes.get("/", (req, res) => {
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

// POST Route for adding new notes
//notes.post();

// DELETE Route for a specific notes passing id
//notes.delete();
module.exports = notes;
