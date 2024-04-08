import { Request, Response } from "express";

import AppDataSource from "../data-source";
import { User } from "../entity/User";
import { encrypt } from "../helper/encrypt";
import { ENTITY } from "../entity/Entity";
import { authRequest } from "../middleware/authentication.middlewate";

export class EntityController {
  static async create(req: Request<null, null, any>, res: Response) {
    try {
      const {
        email,
        password,
        age,
        personName,
        gender,
        entity,
        number,
        licenceNumber,
        npi,
        taxId,
        specialty,
        payerPlan,
        network,
      } = req.body;
      console.log(
        email,
        password,
        age,
        personName,
        gender,
        entity,
        number,
        licenceNumber,
        npi,
        taxId,
        specialty,
        payerPlan,
        network
      );

      if (
        !email ||
        !password ||
        !personName ||
        !age ||
        !gender ||
        !entity ||
        !number
      ) {
        // return res.status(404).json({ message: "should pass CREDENTIALS" });
      }
      if (entity === "provider") {
        if (!licenceNumber || !npi || !specialty || !payerPlan) {
          console.log(licenceNumber, npi, specialty);
          //   return res.status(404).json({ message: "licenceNumber, npi" });
        }
      } else if (entity === "payer") {
        if (!taxId || !network) {
          //   return res
          //     .status(404)
          //     .json({ message: "should pass name,email,password" });
        }
      }
      const entityRepository = AppDataSource.getRepository(ENTITY);
      const userExist = await entityRepository.findOneBy({ email });
      if (userExist) {
        const token = encrypt.generateToken({ id: userExist.id });
        return res.status(200).json({
          message: "update entiry",
          entityToken: token,
          nextStep: userExist.nextStep,
        });
      }
      const encryptedPassword = await encrypt.encryptpass(password);
      const newEntity = new ENTITY();
      newEntity.email = email;
      newEntity.nameOfEntity = entity;
      newEntity.personName = personName;
      newEntity.phoneNumber = number;
      newEntity.age = age;
      newEntity.gender = gender;
      newEntity.password = encryptedPassword;
      newEntity.specialty = specialty;
      if (npi) newEntity.NPI = npi;
      if (licenceNumber) newEntity.providerLicenseNumber = licenceNumber;
      if (taxId) newEntity.taxID = taxId;
      if (network) newEntity.providerNetworksCovered = network;
      if (payerPlan) newEntity.payerPlansSupported = payerPlan;
      newEntity.nextStep = "VerificationData";
      await entityRepository.save(newEntity);
      const token = encrypt.generateToken({ id: newEntity.id });
      delete newEntity.password;
      return res.status(201).json({
        message: "entiry created successfully",
        entityToken: token,
        nextStep: newEntity.nextStep,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.driverError.detail });
    }
  }
  static async updateAddress(req: Request<null, null, any>, res: Response) {
    try {
      const entity = req.headers.authorization;
      console.log(entity);
      const entityRepository = AppDataSource.getRepository(ENTITY);
      // const userExist = await entityRepository.findOneBy({ email });
    } catch (error) {
      console.log(error);

      return res.status(500).json({ message: error.driverError.detail });
    }
  }
  static async get(req: authRequest, res: Response) {
    try {
      const user = req.user;

      const entityRepository = AppDataSource.getRepository(ENTITY);
      const userExist = await entityRepository.findOneBy({ id: user });
      delete userExist.password
      return res.status(201).json({
        message: "entiry created successfully",
        user: userExist,
        nextStep: "Address",
      });
    } catch (error) {
      console.log(error);

      return res.status(500).json({ message: error.driverError.detail });
    }
  }
  static async changePassword(
    req: Request<null, null, { password: string; token: string }>,
    res: Response
  ) {
    try {
      let { password, token } = req.body;

      if (!password || !token) {
        return res.status(404).json({ message: "should pass token,password" });
      }
      const userRepository = AppDataSource.getRepository(User);
      const decode = encrypt.verifyToken(token);
      let id: number | undefined;
      if (typeof decode === "string") {
        // Handle the case where decode is a string
        console.error("Invalid token format");
      } else {
        id = Number(decode.id);
      }

      const user = await userRepository.findOneBy({ id });
      password = await encrypt.encryptpass(password);

      user.password = password;
      user.passwordIsTemporary = false;
      await userRepository.save(user);

      const newToken = encrypt.generateToken({ id: user.id });
      delete user.password;
      return res.status(200).json({ message: "success login", newToken, user });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}
