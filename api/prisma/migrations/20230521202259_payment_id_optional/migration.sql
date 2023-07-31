-- DropForeignKey
ALTER TABLE `service` DROP FOREIGN KEY `Service_paymentId_fkey`;

-- AlterTable
ALTER TABLE `service` MODIFY `paymentId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Service` ADD CONSTRAINT `Service_paymentId_fkey` FOREIGN KEY (`paymentId`) REFERENCES `Payment`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
