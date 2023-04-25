-- CreateTable
CREATE TABLE `Provider` (
    `companyId` INTEGER NOT NULL,
    `preferredPaymentPlanId` INTEGER NOT NULL,
    `preferredGeneralDiscount` DOUBLE NULL DEFAULT 0,

    UNIQUE INDEX `Provider_companyId_key`(`companyId`),
    PRIMARY KEY (`companyId`, `preferredPaymentPlanId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Provider` ADD CONSTRAINT `Provider_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `Company`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Provider` ADD CONSTRAINT `Provider_preferredPaymentPlanId_fkey` FOREIGN KEY (`preferredPaymentPlanId`) REFERENCES `PaymentPlan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
