import * as jwt from "jsonwebtoken";
import * as argon2 from "argon2";
import * as dotenv from "dotenv";

dotenv.config();
const { JWT_SECRET = "132" } = process.env;
export class encrypt {
  static async encryptpass(password: string) {
    return argon2.hash(password);
  }
  static comparepassword(hashPassword: string, password: string) {
    return argon2.verify(password, hashPassword);
  }
 
  static generateToken(payload: any) {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
  }
}
