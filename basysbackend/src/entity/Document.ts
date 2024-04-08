import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProviderPayerDetails } from "./Provider";

@Entity()
export class Document {
  @PrimaryGeneratedColumn()
  document_id: number;

  @Column()
  document_type: string;

  @Column()
  document_file_path: string;

  @ManyToOne(
    () => ProviderPayerDetails,
    (ProviderPayerDetails) => ProviderPayerDetails.addresses
  ) // Define Many-to-One relationship with User entity
  user: ProviderPayerDetails;
}
