import { Request, Response, NextFunction } from "express";
import { addProduct } from "../models/product.js";
import {
  getProductById,
  updateProduct,
  getAllProducts,
  deleteProduct,
} from "../models/product.js";

export const getAddProduct = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
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
  const { title, imageUrl, price, description } = req.body;
  try {
    await addProduct(title, imageUrl, parseFloat(price), description);
    res.redirect("/");
  } catch (error) {
    console.error("Error adding product:", error);
    next(error);
  }
};

export const getEditProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const editMode = req.query.edit;
  const prodId = req.params.productId;
  if (!editMode) {
    return res.redirect("/");
  }
  try {
    if (!prodId) {
      return res.status(400).json({ error: "Product ID is required" });
    }
    const product = await getProductById(prodId);
    if (!product) {
      console.error("Product not found:", prodId);
      return res.redirect("/");
    }
    res.render("admin/edit-product", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: editMode,
      product,
    });
  } catch (error) {
    console.error("Error fetching product:", error);
    next(error);
  }
};

export const postEditProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { productId, title, imageUrl, price, description } = req.body;
  try {
    await updateProduct(productId, {
      title,
      imageUrl,
      price: parseFloat(price),
      description,
    });
    console.log("Updated product:", productId);
    res.redirect("/admin/products");
  } catch (error) {
    console.error("Error updating product:", error);
    next(error);
  }
};

export const getProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await getAllProducts();
    res.render("admin/products", {
      prods: products,
      pageTitle: "Admin Products",
      path: "/admin/products",
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    next(error);
  }
};

export const postDeleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { productId } = req.body;
  try {
    await deleteProduct(productId);
    console.log("Deleted product:", productId);
    res.redirect("/admin/products");
  } catch (error) {
    console.error("Error deleting product:", error);
    next(error);
  }
};
