/*
  Warnings:

  - You are about to drop the `UserCompany` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `UserCompany` DROP FOREIGN KEY `UserCompany_companyId_fkey`;

-- DropForeignKey
ALTER TABLE `UserCompany` DROP FOREIGN KEY `UserCompany_userId_fkey`;

-- DropTable
DROP TABLE `UserCompany`;

-- CreateTable
CREATE TABLE `_CompanyToUser` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_CompanyToUser_AB_unique`(`A`, `B`),
    INDEX `_CompanyToUser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_CompanyToUser` ADD CONSTRAINT `_CompanyToUser_A_fkey` FOREIGN KEY (`A`) REFERENCES `Company`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CompanyToUser` ADD CONSTRAINT `_CompanyToUser_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`personId`) ON DELETE CASCADE ON UPDATE CASCADE;
