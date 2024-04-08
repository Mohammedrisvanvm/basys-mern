import * as jwt from "jsonwebtoken";
import * as argon2 from "argon2";
import * as dotenv from "dotenv";

dotenv.config();
const { JWT_SECRET = "132" } = process.env;
interface JwtPayload {
  id: number;
  iat: number; // Unix timestamp (issued at)
  exp: number; // Unix timestamp (expiration time)
}
export class encrypt {
  static async encryptpass(password: string) {
    return argon2.hash(password);
  }
  static comparepassword(hashPassword: string, password: string) {
    return argon2.verify(hashPassword, password);
  }

  static generateToken(payload: any) {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
  }

  static verifyToken(token: string) :JwtPayload{
    return jwt.verify(token, JWT_SECRET) as JwtPayload
  }
}
