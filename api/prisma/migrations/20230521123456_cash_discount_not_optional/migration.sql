/*
  Warnings:

  - Made the column `cashDiscount` on table `hotel` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `hotel` MODIFY `cashDiscount` DOUBLE NOT NULL;
