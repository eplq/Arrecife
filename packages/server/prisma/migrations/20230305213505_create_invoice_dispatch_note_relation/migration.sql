/*
  Warnings:

  - A unique constraint covering the columns `[dispatchNoteId]` on the table `Invoice` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `dispatchNoteId` to the `Invoice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Invoice` ADD COLUMN `dispatchNoteId` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Invoice_dispatchNoteId_key` ON `Invoice`(`dispatchNoteId`);

-- AddForeignKey
ALTER TABLE `Invoice` ADD CONSTRAINT `Invoice_dispatchNoteId_fkey` FOREIGN KEY (`dispatchNoteId`) REFERENCES `DispatchNote`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
