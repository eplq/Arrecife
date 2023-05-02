-- DropForeignKey
ALTER TABLE `Invoice` DROP FOREIGN KEY `Invoice_dispatchNoteId_fkey`;

-- AlterTable
ALTER TABLE `Invoice` MODIFY `dispatchNoteId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Invoice` ADD CONSTRAINT `Invoice_dispatchNoteId_fkey` FOREIGN KEY (`dispatchNoteId`) REFERENCES `DispatchNote`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
