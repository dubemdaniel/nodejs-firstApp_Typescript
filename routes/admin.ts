import express, { Request, Response, NextFunction } from "express";
import { getAddProduct, postAddProduct, getProducts,getEditProduct } from "../controllers/admin.js";

const router = express.Router();

router.get("/add-product", getAddProduct);

router.post("/add-product", postAddProduct);

router.get("/edit-product/:productId", getEditProduct);


router.get("/products", getProducts);

export { router as adminRoute };
