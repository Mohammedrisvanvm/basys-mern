import { Request, Response } from "express";
import { AdminResponce } from "../dto/admin.dto";
import { Admin } from "../entity/Admin";
import { encrypt } from "../helper/encrypt";
import AppDataSource from "../data-source";

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
}
