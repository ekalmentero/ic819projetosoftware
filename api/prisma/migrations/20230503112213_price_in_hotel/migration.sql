/*
  Warnings:

  - Added the required column `dailyPrice` to the `Hotel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `discount` to the `Hotel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `hotel` ADD COLUMN `dailyPrice` DOUBLE NOT NULL,
    ADD COLUMN `discount` DOUBLE NOT NULL;
