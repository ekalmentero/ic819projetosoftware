/*
  Warnings:

  - Added the required column `hotelId` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `address` MODIFY `code` VARCHAR(255) NOT NULL,
    MODIFY `street` VARCHAR(255) NOT NULL,
    MODIFY `neighborhood` VARCHAR(255) NOT NULL,
    MODIFY `city` VARCHAR(255) NOT NULL,
    MODIFY `state` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `pet` MODIFY `name` VARCHAR(255) NOT NULL,
    MODIFY `species` VARCHAR(255) NOT NULL,
    MODIFY `breed` VARCHAR(255) NOT NULL,
    MODIFY `color` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `room` ADD COLUMN `hotelId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `phone` VARCHAR(255) NOT NULL,
    MODIFY `name` VARCHAR(255) NOT NULL,
    MODIFY `password` VARCHAR(255) NOT NULL,
    MODIFY `cpf` VARCHAR(255) NOT NULL;

-- CreateTable
CREATE TABLE `Hotel` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `phone` VARCHAR(255) NOT NULL,
    `code` VARCHAR(255) NOT NULL,
    `street` VARCHAR(255) NOT NULL,
    `neighborhood` VARCHAR(255) NOT NULL,
    `city` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Room` ADD CONSTRAINT `Room_hotelId_fkey` FOREIGN KEY (`hotelId`) REFERENCES `Hotel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
