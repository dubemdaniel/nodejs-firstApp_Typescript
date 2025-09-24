import { Request, Response, NextFunction } from "express";
import { addProduct } from "../models/product.js";
import { getProductById, updateProduct, getAllProducts } from "../models/product.js";

export const getAddProduct = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
      path: "/admin/add-product",
    editing:false,
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
  await addProduct(title, imageUrl, price, description);
  res.redirect("/");
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
    await updateProduct(productId, { title, imageUrl, price: parseFloat(price), description });
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
  const products = await getAllProducts();
  res.render("admin/products", {
    prods: products,
    pageTitle: "Admin Products",
    path: "/admin/products",
  });
};
