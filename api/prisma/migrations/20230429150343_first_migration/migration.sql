-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `birthday` DATE NOT NULL,
    `password` VARCHAR(100) NOT NULL,
    `cpf` VARCHAR(14) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `admin` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `User_cpf_key`(`cpf`),
    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Address` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(8) NOT NULL,
    `street` VARCHAR(100) NOT NULL,
    `number` VARCHAR(20) NOT NULL,
    `neighborhood` VARCHAR(100) NOT NULL,
    `city` VARCHAR(100) NOT NULL,
    `state` VARCHAR(2) NOT NULL,
    `complement` VARCHAR(255) NOT NULL,
    `userId` INTEGER NOT NULL,

    UNIQUE INDEX `Address_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pet` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `species` VARCHAR(100) NOT NULL,
    `breed` VARCHAR(100) NOT NULL,
    `color` VARCHAR(100) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `gender` ENUM('M', 'F') NOT NULL,
    `age` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Service` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `startDate` DATE NOT NULL,
    `endDate` DATE NOT NULL,
    `finished` BOOLEAN NOT NULL DEFAULT false,
    `petId` INTEGER NOT NULL,
    `roomNumber` INTEGER NOT NULL,
    `paymentId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Payment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATE NOT NULL,
    `time` DATE NOT NULL,
    `total` DOUBLE NOT NULL,
    `subtotal` DOUBLE NOT NULL,
    `installment` INTEGER NOT NULL,
    `discount` DOUBLE NOT NULL,
    `interest` DOUBLE NOT NULL,
    `serviceId` INTEGER NOT NULL,
    `method` ENUM('PIX', 'CreditCard') NOT NULL,
    `status` ENUM('Paid', 'Pending', 'Refused') NOT NULL,

    UNIQUE INDEX `Payment_serviceId_key`(`serviceId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Room` (
    `number` INTEGER NOT NULL,
    `available` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`number`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Address` ADD CONSTRAINT `Address_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pet` ADD CONSTRAINT `Pet_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Service` ADD CONSTRAINT `Service_petId_fkey` FOREIGN KEY (`petId`) REFERENCES `Pet`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Service` ADD CONSTRAINT `Service_roomNumber_fkey` FOREIGN KEY (`roomNumber`) REFERENCES `Room`(`number`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Service` ADD CONSTRAINT `Service_paymentId_fkey` FOREIGN KEY (`paymentId`) REFERENCES `Payment`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
