import type { NextFunction, Request, Response } from "express";
export const allowedOrigins = [
  "http://localhost:5173",
];

const credentials = (req: Request, res: Response, next: NextFunction) => {
  if (allowedOrigins.includes(req.headers.origin)) {
    res.header("Access-Control-Allow-Credentials", "true");
  }
  next();
};
export default credentials;