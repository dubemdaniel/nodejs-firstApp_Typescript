import express from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { getProducts, getIndex, getCart, getCheckout, getOrders, getProduct, postCart ,postDeleteCartItem } from "../controllers/shop.js";
const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

router.get("/", getIndex);

router.get("/products", getProducts);

router.get("/cart", getCart);
router.post("/cart", postCart);

router.get("/products/:productId", getProduct);

router.post("/cart/delete-item", postDeleteCartItem);

router.get("/checkout", getCheckout);

router.get("/orders", getOrders);


export { router as shopRoute };
