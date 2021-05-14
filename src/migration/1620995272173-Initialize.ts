import {MigrationInterface, QueryRunner} from "typeorm";

export class Initialize1620995272173 implements MigrationInterface {
    name = 'Initialize1620995272173'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `displayName` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, `countryCode` varchar(255) NOT NULL, `phoneNumber` varchar(255) NOT NULL, `imageURL` varchar(255) NOT NULL DEFAULT '', `isPhoneNumberVerified` tinyint NOT NULL DEFAULT 0, `isEmailVerified` tinyint NOT NULL DEFAULT 0, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deletedAt` datetime(6) NULL, UNIQUE INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`), UNIQUE INDEX `IDX_069e1ad4a001e44f194cccc66c` (`countryCode`, `phoneNumber`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `otp_verification` (`id` int NOT NULL AUTO_INCREMENT, `countryCode` varchar(255) NULL, `phoneNumber` varchar(255) NULL, `email` varchar(255) NULL, `otpVerifyId` varchar(255) NOT NULL, `otpVerifyCode` varchar(255) NOT NULL, `verify_attempts` int NOT NULL DEFAULT '0', `resend_attempts` int NOT NULL DEFAULT '0', `type` varchar(255) NOT NULL DEFAULT 'PHONE_NUMBER', `status` varchar(255) NOT NULL DEFAULT 'PENDING', `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `userId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `otp_verification` ADD CONSTRAINT `FK_527400337df1fb6a0f021c1341d` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `otp_verification` DROP FOREIGN KEY `FK_527400337df1fb6a0f021c1341d`");
        await queryRunner.query("DROP TABLE `otp_verification`");
        await queryRunner.query("DROP INDEX `IDX_069e1ad4a001e44f194cccc66c` ON `user`");
        await queryRunner.query("DROP INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` ON `user`");
        await queryRunner.query("DROP TABLE `user`");
    }

}
