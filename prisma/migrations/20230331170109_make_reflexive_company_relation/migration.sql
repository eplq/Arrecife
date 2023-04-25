-- AlterTable
ALTER TABLE `Company` ADD COLUMN `ownerId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Company` ADD CONSTRAINT `Company_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `Company`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
