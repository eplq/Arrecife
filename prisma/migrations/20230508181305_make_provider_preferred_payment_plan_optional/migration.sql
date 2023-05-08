/*
  Warnings:

  - The primary key for the `Provider` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `Provider` DROP FOREIGN KEY `Provider_preferredPaymentPlanId_fkey`;

-- AlterTable
ALTER TABLE `Provider` DROP PRIMARY KEY,
    MODIFY `preferredPaymentPlanId` INTEGER NULL,
    ADD PRIMARY KEY (`companyId`);

-- AddForeignKey
ALTER TABLE `Provider` ADD CONSTRAINT `Provider_preferredPaymentPlanId_fkey` FOREIGN KEY (`preferredPaymentPlanId`) REFERENCES `PaymentPlan`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
