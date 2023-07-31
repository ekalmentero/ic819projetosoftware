/*
  Warnings:

  - You are about to drop the column `discount` on the `hotel` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `hotel` DROP COLUMN `discount`,
    ADD COLUMN `cashDiscount` DOUBLE NULL;
