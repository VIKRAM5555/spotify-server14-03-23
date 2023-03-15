import { clients } from "../../index.js";
import express from "express";

var apps = express.Router();

apps.post("/favoriteSong", async function (req, res) {
  var dataFromClient = req.body.isUserFavorite;
  var user = req.body.user;
  // {isUserFavorite:{},user:""} --->From Client
  var userListFromDB = await clients
    .db("spotify")
    .collection("user")
    .findOne({ name: user });
  let result = [];
  let isfavourite =
    userListFromDB.userData === undefined
      ? undefined
      : userListFromDB.userData.isfavourite;
  if (isfavourite !== undefined) {
    let IsFavSongExist = isfavourite.some((a) => a._id === dataFromClient._id);

    if (IsFavSongExist) {
      let songIndexInUser = isfavourite.findIndex(
        (a) => a._id === dataFromClient._id
      );
      isfavourite.splice(songIndexInUser, 1);
      result = isfavourite;
    } else {
      result = [...isfavourite, dataFromClient];
    }
  } else {
    result = [dataFromClient];
  }

  res.set("Access-Control-Allow-Origin", "*").send({
    insertedResponse: await clients
      .db("spotify")
      .collection("user")
      .updateOne({ name: user }, { $set: { "userData.isfavourite": result } }),
    userData: { isfavourite: result },
  });
});

export var userSpace = apps;
