import express from "express";
import { clients } from "../../index.js";

var songImg = express.Router();

songImg.post("/", async function (req, res) {
  var data = req.body;

  res
    .set("Access-Control-Allow-Origin", "*")
    .send(
      await clients.db("gaikanMusic").collection("songInfo").insertMany(data)
    );
});

songImg.get("/", async function (req, res) {
  res
    .set("Access-Control-Allow-Origin", "*")
    .send(
      await clients.db("gaikanMusic").collection("songInfo").find({}).toArray()
    );
});

export var songImg = songImg;
