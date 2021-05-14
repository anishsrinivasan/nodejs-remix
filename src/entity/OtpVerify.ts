import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";

import { User } from "./User";

export type otpVerify = {
  otpVerifyId: string;
  otpVerifyCode: string;
  type?: otpType;
};

export enum otpType {
  email = "EMAIL",
  phoneNumber = "PHONE_NUMBER",
}

export enum otpStatus {
  PENDING = "PENDING",
  SUCCESS = "SUCCESS",
  EXPIRED = "EXPIRED",
  TOO_MANY_ATTEMPTS = "TOO_MANY_ATTEMPTS",
}

@Entity()
export class OtpVerification {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @Column({ default: null })
  countryCode: string;

  @Column({ default: null })
  phoneNumber: string;

  @Column({ default: null })
  email: string;

  @Column()
  otpVerifyId: string;

  @Column()
  otpVerifyCode: string;

  @Column({ default: 0 })
  verify_attempts: number;

  @Column({ default: 0 })
  resend_attempts: number;

  @Column({ type: "enum", enum: otpType, default: otpType.phoneNumber })
  type: otpType;

  @Column({ type: "enum", enum: otpStatus, default: otpStatus.PENDING })
  status: otpStatus;

  @CreateDateColumn()
  createdAt: number;

  @UpdateDateColumn()
  updatedAt: number;
}
