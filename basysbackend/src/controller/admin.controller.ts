import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { AdminResponce } from "../dto/admin.dto";
import { Admin } from "../entity/Admin";
import { encrypt } from "../helper/encrypt";

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

      const userRepository = AppDataSource.getRepository(Admin);
      await userRepository.save(admin);
      //   Use the UserResponse DTO to structure the data being sent in the response
      const userDataSent = new AdminResponce();
      userDataSent.name = admin.name;
      userDataSent.email = admin.email;
      userDataSent.role = admin.role;

      const token = encrypt.generateToken({ id: admin.id });
      console.log(admin);
      delete admin.password;
      console.log(admin);

      return res
        .status(200)
        .json({ message: "User created successfully", token, userDataSent });
    } catch (error) {
      return res.status(500).json({ message: error.driverError.detail });
    }
  }
}
