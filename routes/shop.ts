import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const router = express.Router();

// Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

router.get('/', (req: Request, res: Response, next: NextFunction) => {
    // console.log('in another middleware')
    // res.send("<h1>Hello from Express</h2>")
    return res.sendFile(path.join(__dirname, '../', 'views', 'shop.html'));
});

export { router as shopRoute };