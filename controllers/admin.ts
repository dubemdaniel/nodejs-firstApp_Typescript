import { Request, Response, NextFunction } from "express";
import { addProduct } from "../models/product.js";
import { getAllProducts } from "../models/product.js";

export const getAddProduct = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.render("admin/add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
  });
};

export const postAddProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // const title = req.body.title;
  const { title, imageUrl, price, description } = req.body;
  console.log("adding product:", title, imageUrl, price, description);
  await addProduct(title, imageUrl, price, description);
  res.redirect("/");
};

export const getProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const products = await getAllProducts();
  res.render("admin/products", {
    prods: products,
    pageTitle: "Admin Products",
    path: "/admin/products",
  });
};
