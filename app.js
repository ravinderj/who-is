const express = require("express");
const lib = require("./lib.js");
const updateDataFile = require("./dropbox.js").updateDataFile;

const app = express();
app.use(express.urlencoded({
  extended: false
}));
app.use(updateDataFile);
app.get("/", lib.serveHome);
app.post("/who-is", lib.serveInternInfo);

module.exports = app;
