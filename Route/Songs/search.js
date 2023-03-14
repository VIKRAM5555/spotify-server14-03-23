import { clients } from "../../index.js";
import express from "express";
var searchs = express.Router();

searchs.post("/track", async function (req, res) {
  var Input = req.body.searchTrack; //{"searchTrack":"man"}
  var dataINdatebase = await clients
    .db("gaikanMusic")
    .collection("songInfo")
    .find({})
    .toArray();

  // code start here
  let output = dataINdatebase.filter((a) =>
    a.title.toLowerCase().includes(Input.toLowerCase())
  );
  console.log(output);
  res.send(output);
});

export var search = searchs;
