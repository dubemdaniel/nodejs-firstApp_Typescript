import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { adminRoute } from './admin.js';
import { products } from './admin.js';

const router = express.Router();

// Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

router.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.render('shop', {
        prods: products,
        pageTitle: "shop", 
        path: "/",
        hasProducts: products.length > 0,
        activeShop: true, 
        product: true

    })
});

export { router as shopRoute };