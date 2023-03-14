import express from "express";
import { clients } from "../../index.js";

var songImg = express.Router();

songImg.post("/", async function (req, res) {
  var data = req.body;

  res.send(
    await clients.db("gaikanMusic").collection("songInfo").insertMany(data)
  );
});

songImg.get("/", async function (req, res) {
  res.send(
    await clients.db("gaikanMusic").collection("songInfo").find({}).toArray()
  );
});

export var songImg = songImg;
