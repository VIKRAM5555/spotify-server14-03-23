import { MongoClient } from "mongodb";
import express from "express";
import path from "path";

import { Signup } from "./Route/user/signup.js";
import { userroutesigin } from "./Route/user/signin.js";

import "dotenv/config";
import cors from "cors";
import { tracks } from "./Route/Songs/track.js";
import { songImg } from "./Route/Songs/song&Img.js";
import { search } from "./Route/Songs/search.js";
import { admin } from "./Route/admin/admin.js";
import { userSpace } from "./Route/user/userSpace.js";
import { appPay } from "./Route/Songs/payment/payment.js";
import { createProxyMiddleware } from "http-proxy-middleware";
const app = express();
const apiProxy = createProxyMiddleware({
  target: "http://localhost:4000",
  changeOrigin: true,
});

app.use("/api", apiProxy);
const uri =
  "mongodb+srv://narashimman54:lakshmi97@cluster0.n63nudw.mongodb.net/?retryWrites=true&w=majority";

app.use(express.json());
app.use(cors());

async function main() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("connected...✔✔✔✔");
    return client;
  } catch (err) {
    console.log("error:", err);
  }
}
export var clients = await main();

app.use("/signup", Signup);

app.use("/track", tracks);
app.use("/signin", userroutesigin);
app.use("/song&img", songImg);
app.use("/search", search);
app.use("/admin", admin);
app.use("/userSpace", userSpace);

app.use("/payment", appPay);
const port = process.env.PORT;
app.listen(port, () => console.log(`server runs in ${port}.......✔✔✔`));
