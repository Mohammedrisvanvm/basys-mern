import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ENTITY } from "./Entity";

@Entity()
export class Document {
  @PrimaryGeneratedColumn()
  document_id: number;

  @Column()
  document_type: string;

  @Column()
  document_originalname: string;

  @Column()
  document_filename: string;

  @Column()
  document_file_path: string;

  @ManyToOne(()=>ENTITY, (ENTITY) => ENTITY.Documentes)
  entity: ENTITY;
}

