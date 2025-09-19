import express, { Request, Response, NextFunction } from "express";

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
  products.push({ title: req.body.title });
  res.redirect("/");
};

export const getProducts = (req: Request, res: Response, next: NextFunction) => {
    res.render('shop', {
        prods: products,
        pageTitle: "shop", 
        path: "/",
        hasProducts: products.length > 0,
        activeShop: true, 
        product: true

    })
}