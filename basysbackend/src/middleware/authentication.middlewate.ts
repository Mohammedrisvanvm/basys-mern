import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { encrypt } from "../helper/encrypt";
dotenv.config();
export interface authRequest extends Request {
  user: number;
}
export const authentification = (
  req: authRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;
  console.log(token);

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const decode = encrypt.verifyToken(token);
  console.log(decode);
  // Get the current time in seconds since the Unix epoch
  const currentTime = Math.floor(Date.now() / 1000);

  // Check if the expiration time (exp) is greater than the current time
  const isExpired = decode.exp < currentTime;
  if (isExpired) {
    return res.status(401).json({ message: "Token has expired" });
  }

  let id: number | undefined;
  if (typeof decode === "string") {
    // Handle the case where decode is a string
    console.error("Invalid token format");
  } else {
    id = Number(decode.id);
  }
  if (!decode) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  req.user = id;
  next();
};
