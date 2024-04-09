import { Request, Response } from "express";
import { AdminResponce } from "../dto/admin.dto";
import { Admin } from "../entity/Admin";
import { encrypt } from "../helper/encrypt";
import AppDataSource from "../data-source";
import { User } from "../entity/User";
import { authRequest } from "../middleware/authentication.middlewate";
import { mailService } from "../util/nodeMailer/confirmationMail";
import { ENTITY } from "../entity/Entity";

export class AdminController {
  static async signup(
    req: Request<null, null, { name: string; email: string; password: string }>,
    res: Response
  ) {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res
          .status(404)
          .json({ message: "should pass name,email,password" });
      }
      const encryptedPassword = await encrypt.encryptpass(password);
      const admin = new Admin();
      admin.name = name;
      admin.email = email;
      admin.password = encryptedPassword;
      admin.role = "superadmin";

      const adminRepository = AppDataSource.getRepository(Admin);
      await adminRepository.save(admin);
      //   Use the adminResponse DTO to structure the data being sent in the response
      const adminDataSent = new AdminResponce();
      adminDataSent.name = admin.name;
      adminDataSent.email = admin.email;
      adminDataSent.role = admin.role;

      const token = encrypt.generateToken({ id: admin.id });
      console.log(admin);
      delete admin.password;
      console.log(admin);

      return res
        .status(200)
        .json({ message: "Admin created successfully", token, adminDataSent });
    } catch (error) {
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
      const userRepository = AppDataSource.getRepository(Admin);
      const user = await userRepository.findOneBy({ email });
      if (!user) {
        return res
          .status(404)
          .json({ message: "User not found with the provided email" });
      }

      const verify = await encrypt.comparepassword(user.password, password);

      if (verify) {
        const token = encrypt.generateToken({ id: user.id });
        delete user.password;
        return res
          .status(200)
          .json({ message: "Admin success login", token, user });
      } else {
        return res.status(404).json({ message: "invalid credential" });
      }
    } catch (error) {
      console.log(error);
      return res.status(404).json({ message: error.driverError.detail });
    }
  }
  static async get(req: authRequest, res: Response) {
    try {
      const userRepository = AppDataSource.getRepository(Admin);

      const user = await userRepository.findOneBy({ id: req.user });
      if (!user) {
        return res.status(404);
      }
      delete user.password;
      res.json({ user });
    } catch (error) {
      console.log(error);
      res.status(404).json({ message: error.driverError.detail });
    }
  }
  static async entities(req: authRequest, res: Response) {
    try {
      const entityRepository = AppDataSource.getRepository(ENTITY);

      const entities = await entityRepository.find({
        relations: {
          addresses: true,
          Documentes: true,
        },
      });
      if (!entities) {
        return res.status(404);
      }

      res.json({ entities });
    } catch (error) {
      console.log(error);
      res.status(404).json({ message: error.driverError.detail });
    }
  }
  static async users(req: authRequest, res: Response) {
    try {
      const userRepository = AppDataSource.getRepository(User);

      const users = await userRepository.find();
      if (!users) {
        return res.status(404);
      }
console.log(users);

      res.json({ users });
    } catch (error) {
      console.log(error);
      res.status(404).json({ message: error.driverError.detail });
    }
  }
  static async createUser(req: Request<null, null, any>, res: Response) {
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
      console.log(token);
      delete user.password;
      console.log(user);
      mailService(user.email, password);
      //nodemailer
      return res
        .status(200)
        .json({ message: "User created successfully", token, user });
    } catch (error) {
      console.log(error);

      return res.status(500).json({ message: error.driverError.detail });
    }
  }
}
