/*
  Warnings:

  - You are about to alter the column `discount` on the `Invoice` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `percentage` on the `PaymentPlanPayment` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `preferredGeneralDiscount` on the `Provider` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `rate` on the `Tax` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.

*/
-- AlterTable
ALTER TABLE `Invoice` MODIFY `discount` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `PaymentPlanPayment` MODIFY `percentage` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `Provider` MODIFY `preferredGeneralDiscount` DOUBLE NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `Tax` MODIFY `rate` DOUBLE NOT NULL;
