import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:"user"})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  nickName: string;

  @Column({ nullable: true})
  npi: string;

  @Column({ nullable: false,unique:true })
  email: string;

  @Column({ nullable: false })
  accessRights: string;

  @Column({ default: true })
  active: boolean;

  @Column()
  status: string;

  @Column({ default: true })
  passwordIsTemporary: boolean;

  @Column()
  password: string;
}
