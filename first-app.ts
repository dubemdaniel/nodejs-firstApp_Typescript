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
app.use(express.static(path.join(__dirname, 'public')))

app.set('view engine', 'ejs')
app.set('views', 'views')

// app.set()

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/admin", adminRoute);
app.use(shopRoute);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).render('404', {
   pageTitle: "404 - Not Found", 
    message: "Help me Oh Lord",
    path: req.url
  })
});

const server = http.createServer(app);

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000", import.meta.url);
});

// http.createServer(rqListener);
