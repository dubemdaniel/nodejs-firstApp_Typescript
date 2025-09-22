import { Request, Response, NextFunction } from "express";

import {  getAllProducts } from "../models/product.js";




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

export const getIndex = async(req: Request, res: Response, next: NextFunction) => {
    const products = await getAllProducts()
    console.log(products.length > 0)
  res.render("shop/index", {
    prods: products,
    pageTitle: "shop",
    path: "/",
    hasProducts: products.length > 0,
    activeShop: true,
    product: true,
  });
}