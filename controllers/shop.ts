import { Request, Response, NextFunction } from "express";

import { getAllProducts, getProductById } from "../models/product.js";
import { addToCart, deleteFromCart, getCartData } from "../models/cart.js";

export const getProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await getAllProducts();
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "All Products",
      path: "/products",
    });
  } catch (error) {
    console.error("Error in getProducts:", error);
    next(error);
  }
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
export const getProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const prodId = req.params.productId;
  try {
    if (!prodId) {
      return res.status(400).json({ error: "Product ID is required" });
    }
    const product = await getProductById(prodId);

    res.render("shop/product-detail", {
      product,
      pageTitle: `Product Detail${product ? product.title : ""}`,
      path: "/products",
    });
  } catch (error) {
    console.error("Error fetching product:", error);
    next(error);
  }
};

export const getCart = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    const cart = await getCartData();
    res.render('shop/cart', {
      path: '/cart',
      pageTitle: 'Your Cart',
      cart,
      totalPrice: cart.reduce((total, item) => total + item.price * item.quantity, 0),
    });
  } catch (error) {
    console.error('Error fetching cart:', error);
    next(error);
  }
};

export const postCart = async (req: Request, res: Response, next: NextFunction) => {
  const prodId = req.body.productId; 
  try {
    const product = await getProductById(prodId);
    if (!product) {
      console.error('Product not found:', prodId);
      return res.redirect('/products');
    }
    await addToCart(prodId, product);
    console.log('Added to cart:', prodId);
    res.redirect('/cart');
  } catch (error) {
    console.error('Error adding to cart:', error);
    next(error);
  }
};


export const postDeleteCartItem = async (req: Request, res: Response, next: NextFunction) => {
  const productId = req.body.productId; 
  try {
    await deleteFromCart(productId);
    console.log('Deleted cart item:', productId);
    res.redirect('/cart');
  } catch (error) {
    console.error('Error deleting cart item:', error);
    next(error);
  }
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
