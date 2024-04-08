import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { ProviderPayerDetails } from "./Provider";

// Define the entity for Provider/Payer Details
@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  physicalStreet: string;

  @Column()
  physicalCity: string;

  @Column()
  physicalState: string;

  @Column()
  physicalPostalCode: string;

  @Column()
  physicalCountry: string;

  @Column({ nullable: true })
  billingStreet: string;

  @Column({ nullable: true })
  billingCity: string;

  @Column({ nullable: true })
  billingState: string;

  @Column({ nullable: true })
  billingPostalCode: string;

  @Column({ nullable: true })
  billingCountry: string;

  @ManyToOne(
    () => ProviderPayerDetails,
    (ProviderPayerDetails) => ProviderPayerDetails.addresses
  ) // Define Many-to-One relationship with User entity
  user: ProviderPayerDetails;
}
