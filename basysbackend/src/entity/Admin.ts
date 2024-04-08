import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IsEmail } from "class-validator";
@Entity({ name: "Admin" })
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true, nullable: false })
  @IsEmail({}, { message: "Email must be in a valid format" })
  email: string;

  @Column()
  role: string;

  @Column()
  password: string;
}
