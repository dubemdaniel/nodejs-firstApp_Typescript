import express, { Request, Response, NextFunction } from "express";
import path from "path";
import rootDir from "../util/path.js";

const router = express.Router();

 const products: any[] = []

router.get(
  "/add-product",
  (req: Request, res: Response, next: NextFunction) => {
    // console.log('This is a product page')
    // res.send('<form action="/admin/product" method="POST"><input type="text" name="title"><button type="submit">Add PRoduct</button></form>')
    res.sendFile(path.join(rootDir, "views", "add-product.html"));
  }
);

router.post("/product", (req: Request, res: Response, next: NextFunction) => {
  // console.log('this is the product info')

  // if (!req.body.name) {
  //     return res.status(400).json({error: "something went wrong"})
  // }
  products.push({title: req.body.title});
  res.redirect("/");
});

export { router as adminRoute, products };

