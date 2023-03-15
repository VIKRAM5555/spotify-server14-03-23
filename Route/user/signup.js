import express from "express";
import bodyParser from "body-parser";
import { check, validationResult } from "express-validator";
import { clients } from "../../index.js";
import bcrypt from "bcrypt";
const app = express();
app.use(bodyParser.json());

app.post(
  "/",
  [
    check("userName")
      .isLength({ min: 2, max: 20 })
      .withMessage("Username must be between 6 and 20 characters")
      .trim()
      .escape(),
    check("password")
      .isLength({ min: 2, max: 20 })
      .withMessage("Password must be between 6 and 20 characters"),
  ],
  async (req, res) => {
    var data = req.body;

    const userExists = await clients
      .db("spotify")
      .collection("user")
      .findOne({ name: req.body.userName });

    const saltRounds = 10; // Number of salt rounds to use

    // Function to hash a password with salting
    const hashPassword = async (data) => {
      try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(data, salt);
        return hash;
      } catch (err) {
        console.log(err);
      }
    };

    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   return res
    //     .status(401)
    //     .json({ success: false, errors: ["Username already exists"] });
    // }

    if (userExists !== null) {
      return res
        .set("Access-Control-Allow-Origin", "*")
        .json({ success: false, errors: ["Username already exists"] });
    }
    const hashedPassword = await hashPassword(req.body.password);

    // bcrypt.compare(data.password, hashedPassword, (err, result) => {
    //   if (err) {
    //     throw new Error("Error comparing passwords: ", err);
    //   }
    //   if (result === true) {
    //     console.log("Passwords match!");
    //   } else {
    //     console.log("Passwords do not match!");
    //   }
    // });
    if (!userExists) {
      let userData = {
        isfavourite: [],
        // adddesd
      };
      await clients.db("spotify").collection("user").insertOne({
        name: req.body.userName,
        password: hashedPassword,
        userData,
      });
      return res
        .set("Access-Control-Allow-Origin", "*")
        .json({ success: true, message: ["Successfully Created"] });
    }

    return res.set("Access-Control-Allow-Origin", "*").json({ success: true });
  }
);

export var Signup = app;
