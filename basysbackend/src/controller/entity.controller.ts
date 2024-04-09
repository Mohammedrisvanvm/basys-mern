import { Request, Response } from "express";

import AppDataSource from "../data-source";
import { Address } from "../entity/Address";
import { Document } from "../entity/Document";
import { ENTITY } from "../entity/Entity";
import { encrypt } from "../helper/encrypt";
import { authRequest } from "../middleware/authentication.middlewate";
import { RegmailService } from "../util/nodeMailer/registeredmail";

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
        return res.status(404).json({ message: "should pass CREDENTIALS" });
      }
      if (entity === "provider") {
        if (!licenceNumber || !npi || !specialty || !payerPlan) {
          console.log(licenceNumber, npi, specialty);
          return res.status(404).json({ message: "licenceNumber, npi" });
        }
      } else if (entity === "payer") {
        if (!taxId || !network) {
          return res
            .status(404)
            .json({ message: "should pass name,email,password" });
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
      const entityRepository = AppDataSource.getRepository(ENTITY);
      const entitydata = await entityRepository.findOneBy({ id: user });
      for (const data of files) {
        const newDocument = new Document();
        newDocument.document_file_path = data.path;
        newDocument.document_type = data.mimetype;
        newDocument.document_originalname = data.originalname;
        newDocument.document_filename = data.filename;
        newDocument.entity = entitydata;
        await DocumentRepository.save(newDocument);
      }
      const token = encrypt.generateToken({ id: entitydata.id });
      RegmailService(entitydata.email);
      return res.status(201).json({
        message: "Document added",
        entityToken: token,
      });
    } catch (error) {
      console.log(error);

      return res.status(500).json({ message: error.driverError.detail });
    }
  }
  static async get(req: authRequest, res: Response) {
    try {
      const user = req.user;
      const entityRepository = AppDataSource.getRepository(ENTITY);
      const userExist = await entityRepository.find({
        relations: {
          addresses: true,
          Documentes: true,
        },
      });

      if (!userExist) {
        return res.status(404).json({
          message: "credentials not found",
        });
      }
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
      newAddress.entity = userdata;
      await addressRepository.save(newAddress);
      const token = encrypt.generateToken({ id: userdata.id });
      return res
        .status(201)
        .json({ message: "address added", entityToken: token, userdata });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}
