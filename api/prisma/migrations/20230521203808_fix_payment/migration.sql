/*
  Warnings:

  - You are about to drop the column `serviceId` on the `payment` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Payment_serviceId_key` ON `payment`;

-- AlterTable
ALTER TABLE `payment` DROP COLUMN `serviceId`;
