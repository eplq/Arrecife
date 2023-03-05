-- CreateTable
CREATE TABLE `PaymentPlan` (
    `id` INTEGER NOT NULL,
    `name` VARCHAR(45) NOT NULL,
    `companyId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PaymentPlanPayment` (
    `paymentPlanId` INTEGER NOT NULL,
    `days` INTEGER NOT NULL,
    `percentage` INTEGER NOT NULL,

    PRIMARY KEY (`paymentPlanId`, `days`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PaymentPlan` ADD CONSTRAINT `PaymentPlan_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `Company`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PaymentPlanPayment` ADD CONSTRAINT `PaymentPlanPayment_paymentPlanId_fkey` FOREIGN KEY (`paymentPlanId`) REFERENCES `PaymentPlan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
