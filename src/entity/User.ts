import {
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";

@Unique(["countryCode", "phoneNumber"])
@Unique(["email"])
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  displayName: string;

  @Column()
  email: string;

  @Column()
  countryCode: string;

  @Column()
  phoneNumber: string;

  @Column({ default: "" })
  imageURL: string;

  @Column({ default: false })
  isPhoneNumberVerified: boolean;

  @Column({ default: false })
  isEmailVerified: boolean;

  @CreateDateColumn()
  createdAt: number;

  @UpdateDateColumn()
  updatedAt: number;

  @DeleteDateColumn()
  deletedAt: number;
}
