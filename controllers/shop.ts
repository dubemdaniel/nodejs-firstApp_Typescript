import { Request, Response, NextFunction } from "express";

import { getAllProducts, getProductById } from "../models/product.js";

export const getProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const products = await getAllProducts();
  console.log(products.length > 0);
  res.render("shop/product-list", {
    prods: products,
    pageTitle: "All Products",
    path: "/products",
    // hasProducts: products.length > 0,
    // activeShop: true,
    // product: true,
  });
};

export const getIndex = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const products = await getAllProducts();
  console.log(products.length > 0);
  res.render("shop/index", {
    prods: products,
    pageTitle: "shop",
    path: "/",
    // hasProducts: products.length > 0,
    // activeShop: true,
    // product: true,
  });
};
export const getProduct = async (req: Request, res: Response, next: NextFunction) => {
  const prodId = req.params.productId;
  try {
    const product = await getProductById(prodId); 
    console.log(product);
    res.render("shop/product-detail", {
      product,
      pageTitle: `product-detail${product ? product.title : ''}`,
      path: "/products",
    });
  } catch (error) {
    console.error("Error fetching product:", error);
    next(error); 
  }
};

export const getCart = (req: Request, res: Response, next: NextFunction) => {
  res.render("shop/cart", {
    path: "/cart",
    pageTitle: "Your Cart",
  });
};

export const getOrders = (req: Request, res: Response, next: NextFunction) => {
  res.render("shop/orders", {
    path: "/orders",
    pageTitle: "Your Orders",
  });
};

export const getCheckout = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Your Cart",
  });
};
