import express from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { getProducts, getIndex } from "../controllers/shop.js";
const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

router.get("/", getIndex);

router.get("/products", getProducts);

// router.get("/cart");

// router.get("/checkout");

export { router as shopRoute };
