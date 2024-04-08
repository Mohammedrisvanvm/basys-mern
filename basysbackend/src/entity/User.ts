import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  nickName: string;

  @Column()
  npi: string;

  @Column()
  email: string;

  @Column()
  accessRights: string;

  @Column({ default: true })
  active: boolean;

  @Column({ default: true })
  passwordIsTemporary: boolean;

  @Column()
  password: string;

}
