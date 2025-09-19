import express, { Request, Response, NextFunction } from "express";
import { getAddProduct, postAddProduct } from "../controllers/products.js";

const router = express.Router();

router.get("/add-product", getAddProduct);

router.post("/add-product", postAddProduct);

export { router as adminRoute };
