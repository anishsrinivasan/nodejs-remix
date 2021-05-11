import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  display_name: string;

  @Column()
  email: string;

  @Column()
  country_code: string;

  @Column()
  phone_number: string;

  @Column({ default: "" })
  image_url: string;
}
