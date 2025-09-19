import express from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { getProducts } from "../controllers/products.js";
const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

router.get("/", getProducts);

export { router as shopRoute };
