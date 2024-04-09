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
export class ENTITY {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nameOfEntity: string;

  @Column()
  personName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  phoneNumber: string;

  @Column()
  age: string;

  @Column()
  gender: string;

  @Column()
  password: string;

  @OneToMany(() => Address,(Address)=>Address.entity,{cascade:true}) // Define One-to-Many relationship with Address entity
  addresses: Address[];

  @OneToMany(() => Document,(Document)=>Document.entity,{cascade:true}) // Define One-to-Many relationship with Document entity
  Documentes: Document[];

  @Column({ nullable: true, unique: true })
  taxID: string;

  @Column({ nullable: true, unique: true })
  providerLicenseNumber: string;

  @Column({ nullable: true, unique: true })
  NPI: string;

  @Column({ nullable: true })
  specialty: string;

  @Column({ nullable: true })
  payerPlansSupported: string;

  @Column({ nullable: true })
  providerNetworksCovered: string;

  @Column({ nullable: true })
  nextStep: string; 
}
