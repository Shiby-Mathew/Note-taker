const notes = require("express").Router();
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require("../helpers/fsUtils");
const { v4: uuidv4 } = require("uuid");

//GET route for retriving all the notes

notes.get("/", (req, res) => {
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

// POST Route for adding new notes

notes.post("/", (req, res) => {
  const { title, text } = req.body;
  if (req.body) {
    const newNote = {
      title,
      text,
      note_id: uuidv4(),
    };
    readAndAppend(newNote, "./db/db.json");
    res.json(`Note added successfully`);
  } else {
    res.status(403).json("Invalid entry");
  }
});
// DELETE Route for a specific notes passing id

notes.delete("/:note_id", (req, res) => {
  const noteID = req.params.note_id;
  readFromFile("./db/db.json")
    .then((data) => JSON.parse(data))
    .then((json) => {
      // Make a new array of all tips except the one with the ID provided in the URL
      const result = json.filter((note) => note.note_id !== noteID);

      // Save that array to the filesystem
      writeToFile("./db/db.json", result);

      // Respond to the DELETE request
      res.json(`Item ${noteID} has been deleted 🗑️`);
      console.log(`Item ${noteID} has been deleted 🗑️`);
    });
});

module.exports = notes;
