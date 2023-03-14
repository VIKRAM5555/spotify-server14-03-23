import { clients } from "../../index.js";
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
var apps = express.Router();

apps.post("/", async function (req, res) {
  var data = req.body;
  // {name:"",password:""}
  var userexist = await clients
    .db("spotify")
    .collection("user")
    .findOne({ name: data.name });

  if (!userexist) {
    res.set("Access-Control-Allow-Origin", "*").status(404).send({ msg: "Invalid Credential" });
  } else {
    var camparePwd = await bcrypt.compare(data.password, userexist.password);

    if (camparePwd) {
      const token = jwt.sign({ id: userexist._id }, process.env.PrivateKey);
      res.set("Access-Control-Allow-Origin", "*").send({
        msg: "Successful Login",
        token: token,
        userdata: userexist.userData === undefined ? null : userexist.userData,
      });
    } else {
      res.set("Access-Control-Allow-Origin", "*").status(404).send({ msg: "Invalid Credential" });
    }
  }
});

export var userroutesigin = apps;
