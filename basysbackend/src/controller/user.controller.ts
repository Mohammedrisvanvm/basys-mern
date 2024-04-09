import { Request, Response } from "express";

import AppDataSource from "../data-source";
import { User } from "../entity/User";
import { encrypt } from "../helper/encrypt";
import { authRequest } from "../middleware/authentication.middlewate";
import { RegmailService } from "../util/nodeMailer/registeredmail";

export class UserController {
  static async signup(req: Request<null, null, any>, res: Response) {
    try {
      const { firstName, lastName, email, nickName, password, npi } = req.body;
      console.log(firstName, lastName, email, nickName, password);

      if (!firstName || !lastName || !nickName || !email || !password) {
        return res
          .status(404)
          .json({ message: "should pass name,email,password" });
      }
      const encryptedPassword = await encrypt.encryptpass(password);
      const user = new User();
      user.firstName = firstName;
      user.lastName = lastName;
      user.email = email;
      user.password = encryptedPassword;
      user.accessRights = "admin";
      user.nickName = nickName;
      user.npi = npi !== null ? npi : null;
      console.log(user);

      const userRepository = AppDataSource.getRepository(User);
      await userRepository.save(user);

      const token = encrypt.generateToken({ id: user.id });
      console.log(user);
      delete user.password;
      console.log(user);
      //nodemailer
      return res
        .status(200)
        .json({ message: "User created successfully", token, user });
    } catch (error) {
      console.log(error);

      return res.status(500).json({ message: error.driverError.detail });
    }
  }
  static async signin(
    req: Request<null, null, { email: string; password: string }>,
    res: Response
  ) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(404).json({ message: "should pass email,password" });
      }
      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOneBy({ email });
      console.log(user);

      const verify = await encrypt.comparepassword(user.password, password);
      if (verify) {
        const token = encrypt.generateToken({ id: user.id });
        if (user.passwordIsTemporary) {
          return res
            .status(200)
            .json({ message: "please change password", token });
        }
        delete user.password;
        return res.status(200).json({ message: "success login", token, user });
      } else {
        return res.status(404).json({ message: "invalid credential" });
      }
    } catch (error) {
      console.log(error);

      return res.status(500).json({ message: error.driverError.detail });
    }
  }
  static async changePassword(req: authRequest, res: Response) {
    try {
      let { password, confirmPassword } = req.body;

      if (!password || !confirmPassword) {
        return res.status(404).json({ message: "should pass token,password" });
      }
      if (password !== confirmPassword) {
        return res.status(401).json({ message: "credential is wrong" });
      }
      const userRepository = AppDataSource.getRepository(User);

      const id = req.user;
      const user = await userRepository.findOneBy({ id });
      if (user) {
        password = await encrypt.encryptpass(password);

        user.password = password;
        user.passwordIsTemporary = false;
        user.status = "Onboarded";
        await userRepository.save(user);

        const newToken = encrypt.generateToken({ id: user.id });
        delete user.password;
        RegmailService(user.email)
        return res
          .status(200)
          .json({ message: "success login", token: newToken, user });
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  static async editUser(req: authRequest, res: Response) {
    try {
      const { firstName, lastName, email, nickName, password, npi } = req.body;
      console.log(firstName, lastName, email, nickName, password);
      const id = req.user;
      const userRepository = AppDataSource.getRepository(User);
      const encryptedPassword = await encrypt.encryptpass(password);
      const user = await userRepository.findOneBy({
        id,
      });
      user.firstName = firstName ? firstName : user.firstName;
      user.lastName = lastName ? lastName : user.lastName;
      user.email = email ? email : user.email;
      user.password = password ? encryptedPassword : user.password;
      user.nickName = nickName ? nickName : user.nickName;
      user.npi = npi ? npi : user.npi;

      await userRepository.save(user);

      const token = encrypt.generateToken({ id: user.id });
      delete user.password;
      //nodemailer
      return res
        .status(200)
        .json({ message: "User edit successfully", token, user });
    } catch (error) {
      console.log(error);

      return res.status(500).json({ message: error.driverError.detail });
    }
  }
}
