import path from "path";
import http from "http";
import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";

import { fileURLToPath } from "url";
import { adminRoute } from "./routes/admin.js";
import { shopRoute } from "./routes/shop.js";

// Recreate __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// app.set()

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/admin", adminRoute);
app.use(shopRoute);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

const server = http.createServer(app);

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000", import.meta.url);
});

// http.createServer(rqListener);
