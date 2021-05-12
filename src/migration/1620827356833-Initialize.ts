import { MigrationInterface, QueryRunner } from "typeorm";

export class Initialize1620827356833 implements MigrationInterface {
  name = "Initialize1620827356833";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `displayName` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, `countryCode` varchar(255) NOT NULL, `phoneNumber` varchar(255) NOT NULL, `imageURL` varchar(255) NOT NULL DEFAULT '', `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deletedAt` datetime(6) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB"
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("DROP TABLE `user`");
  }
}
