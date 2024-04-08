import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ENTITY } from "./Entity";

@Entity()
export class Document {
  @PrimaryGeneratedColumn()
  document_id: number;

  @Column()
  document_type: string;

  @Column()
  document_file_path: string;

  @ManyToOne(
    () => ENTITY,
    (ENTITY) => ENTITY.addresses
  ) // Define Many-to-One relationship with User entity
  user: ENTITY;
}
