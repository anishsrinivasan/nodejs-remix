import {MigrationInterface, QueryRunner} from "typeorm";

export class Initialize1620932632182 implements MigrationInterface {
    name = 'Initialize1620932632182'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `displayName` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, `countryCode` varchar(255) NOT NULL, `phoneNumber` varchar(255) NOT NULL, `imageURL` varchar(255) NOT NULL DEFAULT '', `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deletedAt` datetime(6) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `otp_verification` (`id` int NOT NULL AUTO_INCREMENT, `countryCode` varchar(255) NULL, `phoneNumber` varchar(255) NULL, `email` varchar(255) NULL, `otpVerifyId` varchar(255) NOT NULL, `otpVerifyCode` varchar(255) NOT NULL, `verify_attempts` int NOT NULL DEFAULT '0', `resend_attempts` int NOT NULL DEFAULT '0', `type` varchar(255) NOT NULL DEFAULT 'PHONE_NUMBER', `status` varchar(255) NOT NULL DEFAULT 'PENDING', `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `userId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `otp_verification` ADD CONSTRAINT `FK_527400337df1fb6a0f021c1341d` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `otp_verification` DROP FOREIGN KEY `FK_527400337df1fb6a0f021c1341d`");
        await queryRunner.query("DROP TABLE `otp_verification`");
        await queryRunner.query("DROP TABLE `user`");
    }

}
