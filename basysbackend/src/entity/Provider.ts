// Import necessary modules from TypeORM
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { Address } from "./Address";
import { Document } from "./Document";

// Define the entity for Provider/Payer Details
@Entity()
export class ProviderPayerDetails {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nameOfEntity: string;

  @Column()
  personName: string;

  @Column()
  email: string;

  @Column()
  phoneNumber: string;

  @OneToMany(() => Address, (address) => address.user, { cascade: true }) // Define One-to-Many relationship with Address entity
  addresses: Address[];

  @OneToMany(() => Document, (Document) => Document.user, { cascade: true }) // Define One-to-Many relationship with Document entity
  Documentes: Document[];

  @Column({ nullable: true })
  taxID: string;

  @Column({ nullable: true })
  providerLicenseNumber: string;

  @Column({ nullable: true })
  NPI: string;

  @Column({ nullable: true })
  specialty: string;

  @Column({ nullable: true })
  payerPlansSupported: string;

  @Column({ nullable: true })
  providerNetworksCovered: string;
}

// @Column({ nullable: true })
//   billingStreet: string;

//   @Column({ nullable: true })
//   billingCity: string;

//   @Column({ nullable: true })
//   billingState: string;

//   @Column({ nullable: true })
//   billingPostalCode: string;

//   @Column({ nullable: true })
//   billingCountry: string;
