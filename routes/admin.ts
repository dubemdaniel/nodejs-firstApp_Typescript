import express, { Request, Response, NextFunction } from "express";
import { getAddProduct, postAddProduct, getProducts,getEditProduct, postEditProduct } from "../controllers/admin.js";

const router = express.Router();

router.get("/add-product", getAddProduct);

router.post("/add-product", postAddProduct);

router.get("/edit-product/:productId", getEditProduct);

router.post("/edit-product", postEditProduct);

router.get("/products", getProducts);

export { router as adminRoute };
