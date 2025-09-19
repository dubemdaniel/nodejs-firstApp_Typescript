import express, { Request, Response, NextFunction } from "express";

import {addProduct, getAllProducts} from '../models/product.js'

export const products: { title: string }[] = [];



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

export const postAddProduct = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
    const {title} = req.body.title
  addProduct(title)
  res.redirect("/");
};

export const getProducts = (req: Request, res: Response, next: NextFunction) => {
    res.render('shop', {
        prods: getAllProducts,
        pageTitle: "shop", 
        path: "/",
        hasProducts: products.length > 0,
        activeShop: true, 
        product: true

    })
}