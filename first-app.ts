import path from "path";
import http from "http";
import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import { notFound } from "./controllers/notFound.js";
import { fileURLToPath } from "url";
import { adminRoute } from "./routes/admin.js";
import { shopRoute } from "./routes/shop.js";
import db from "./util/database.js";

// Recreate __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", "views");

db.execute("SELECT * FROM products")
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log("omo, better big error dey here oo ", err);
  });

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/admin", adminRoute);
app.use(shopRoute);

app.use(notFound);

const server = http.createServer(app);

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000", import.meta.url);
});

// http.createServer(rqListener);
