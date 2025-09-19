import express, { Request, Response, NextFunction } from "express";

import { addProduct, getAllProducts } from "../models/product.js";


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
    console.log(products.length > 0)
  res.render("shop/product-list", {
    prods: products,
    pageTitle: "shop",
    path: "/",
    hasProducts: products.length > 0,
    activeShop: true,
    product: true,
  });
};
