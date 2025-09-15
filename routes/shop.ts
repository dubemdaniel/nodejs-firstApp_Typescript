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
    // console.log('in another middleware')
    // res.send("<h1>Hello from Express</h2>")
    console.log("na me dey really hot ", products.map(me => {
        return me.title
    }))
    return res.sendFile(path.join(__dirname, '../', 'views', 'shop.html'));
});

export { router as shopRoute };