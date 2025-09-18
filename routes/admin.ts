import express, { Request, Response, NextFunction } from "express";
import path from "path";
import rootDir from "../util/path.js";

const router = express.Router();

 const products: any[] = []

router.get(
  "/add-product",
  (req: Request, res: Response, next: NextFunction) => {
    res.render('add-product', {
      pageTitle: "Add Product",
      path: '/admin/add-product',
      formsCSS: true,
      productCSS: true, 
      activeAddProduct:true
   })
   
  });

router.post("/add-product", (req: Request, res: Response, next: NextFunction) => {
 
  products.push({title: req.body.title});
  res.redirect("/");
});

export { router as adminRoute, products };

