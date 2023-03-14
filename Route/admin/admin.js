import { clients } from "../../index.js";
import express from "express";
var admin = express.Router();

admin.post("/", async function (req, res) {
  var data = req.body;
  var alldata = await clients
    .db("gaikanMusic")
    .collection("songInfo")
    .find({})
    .toArray();

  res.send(
    await clients
      .db("gaikanMusic")
      .collection("songInfo")
      .insertOne({ ...data, id: alldata.length + 1 })
  );
});

export var admin = admin;
