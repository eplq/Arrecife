-- CreateTable
CREATE TABLE `UserCompany` (
    `userId` INTEGER NOT NULL,
    `companyId` INTEGER NOT NULL,
    `managesIt` BOOLEAN NOT NULL,

    PRIMARY KEY (`userId`, `companyId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Company` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(80) NOT NULL,
    `NIF` VARCHAR(10) NOT NULL,
    `address` VARCHAR(70) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserCompany` ADD CONSTRAINT `UserCompany_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`personId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserCompany` ADD CONSTRAINT `UserCompany_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `Company`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
