import { Request, Response } from "express";

import AppDataSource from "../data-source";
import { Document } from "../entity/Document";
import { ENTITY } from "../entity/Entity";
import { User } from "../entity/User";
import { encrypt } from "../helper/encrypt";
import { authRequest } from "../middleware/authentication.middlewate";
import { Address } from "../entity/Address";

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
  static async verification(req: authRequest, res: Response) {
    try {
      interface UploadedFile {
        fieldname: string;
        originalname: string;
        encoding: string;
        mimetype: string;
        buffer: Buffer;
        size: number;
      }
      const user = req.user;
      const files: UploadedFile[] | any = req.files;

      const DocumentRepository = AppDataSource.getRepository(Document);
      const userRepository = AppDataSource.getRepository(User);
      const userdata = await userRepository.findOneBy({ id: user });
      for (const data of files) {
        const newDocument = new Document();
        newDocument.document_file_path = data.path;
        newDocument.document_type = data.mimetype;
        newDocument.document_originalname = data.originalname;
        newDocument.document_filename = data.filename;
        // newDocument.user = userdata;
        await DocumentRepository.save(newDocument);
      }
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
      if (!userExist) {
        return res.status(404).json({
          message: "credentials not found",
        });
      }
      delete userExist.password;
      return res.status(200).json({
        message: "user data",
        user: userExist,
        nextStep: "Address",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.driverError.detail });
    }
  }
  static async updateAddress(req: authRequest, res: Response) {
    try {
      let { state, street, city, country, postalCode } = req.body;
      console.log(state, street, city, country, postalCode);
      if (!state || !street || !city || !country || !postalCode) {
        return res.status(404).json({ message: "should pass token,password" });
      }
      const addressRepository = AppDataSource.getRepository(Address);
      const entityRepository = AppDataSource.getRepository(ENTITY);
      const user = req.user;
      const userdata = await entityRepository.findOneBy({ id: user });
      const newAddress = new Address();
      newAddress.physicalStreet = street;
      newAddress.physicalCity = city;
      newAddress.physicalState = state;
      newAddress.physicalPostalCode = postalCode;
      newAddress.physicalCountry = country;
      newAddress.user = userdata;
      await addressRepository.save(newAddress);
      return res.status(201).json({ message: "address added", userdata });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}