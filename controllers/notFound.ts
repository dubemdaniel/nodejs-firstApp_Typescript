import { Request, Response, NextFunction } from "express";

 export const notFound = (req: Request, res: Response, next: NextFunction) => {
   res.status(404).render('404', {
    pageTitle: "404 - Not Found", 
     message: "Help me Oh Lord",
     path: req.url
   })
 }