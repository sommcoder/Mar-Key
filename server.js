const express = require("express");
const app = express();
const port = 5000; // server is listening on port 5000

// I want the client to request a letter from the resource
// I then want the server to accept the request, access the letter, read the .json file and send back the data associated with that letter to the client

// every path!
app.get("/", (req, res) => {
  console.log("file Sent");
  res.send("hello world!");
});

let optionsObj = {
  root: "data",
};

// block path!
app.get("/block", (req, res) => {
  res.sendFile("/blockData.json", optionsObj);
});

// server is listening...
app.listen(port, () => console.log(`listening on port: ${port}`));
