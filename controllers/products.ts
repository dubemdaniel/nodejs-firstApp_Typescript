import express, { Request, Response, NextFunction } from "express";

import { addProduct, getAllProducts } from "../models/product.js";


export const getAddProduct = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.render("add-product", {
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
  console.log("yo nigga", req);
  const title = req.body.title;
  console.log("adding product:", title);
  await addProduct(title);
  res.redirect("/");
};

export const getProducts = async(
  req: Request,
  res: Response,
  next: NextFunction
) => {
    const products = await getAllProducts()
  res.render("shop", {
    prods: products,
    pageTitle: "shop",
    path: "/",
    hasProducts: products.length > 0,
    activeShop: true,
    product: true,
  });
};
