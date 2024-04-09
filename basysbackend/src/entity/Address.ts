import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { ENTITY } from "./Entity";

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

  @ManyToOne(() => ENTITY, (ENTITY) => ENTITY.addresses) // Define Many-to-One relationship with User entity
  entity: ENTITY;
}
