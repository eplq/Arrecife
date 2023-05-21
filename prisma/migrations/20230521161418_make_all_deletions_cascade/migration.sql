-- DropForeignKey
ALTER TABLE `Brand` DROP FOREIGN KEY `Brand_providerId_fkey`;

-- DropForeignKey
ALTER TABLE `Building` DROP FOREIGN KEY `Building_companyId_fkey`;

-- DropForeignKey
ALTER TABLE `Company` DROP FOREIGN KEY `Company_ownerId_fkey`;

-- DropForeignKey
ALTER TABLE `Contact` DROP FOREIGN KEY `Contact_companyId_fkey`;

-- DropForeignKey
ALTER TABLE `Contact` DROP FOREIGN KEY `Contact_personId_fkey`;

-- DropForeignKey
ALTER TABLE `DispatchNote` DROP FOREIGN KEY `DispatchNote_companyId_fkey`;

-- DropForeignKey
ALTER TABLE `DueDate` DROP FOREIGN KEY `DueDate_invoiceId_fkey`;

-- DropForeignKey
ALTER TABLE `Invoice` DROP FOREIGN KEY `Invoice_buyerId_fkey`;

-- DropForeignKey
ALTER TABLE `Invoice` DROP FOREIGN KEY `Invoice_dispatchNoteId_fkey`;

-- DropForeignKey
ALTER TABLE `Invoice` DROP FOREIGN KEY `Invoice_paymentPlanId_fkey`;

-- DropForeignKey
ALTER TABLE `Invoice` DROP FOREIGN KEY `Invoice_sellerId_fkey`;

-- DropForeignKey
ALTER TABLE `InvoiceProducts` DROP FOREIGN KEY `InvoiceProducts_invoiceId_fkey`;

-- DropForeignKey
ALTER TABLE `InvoiceProducts` DROP FOREIGN KEY `InvoiceProducts_productId_fkey`;

-- DropForeignKey
ALTER TABLE `PaymentPlan` DROP FOREIGN KEY `PaymentPlan_companyId_fkey`;

-- DropForeignKey
ALTER TABLE `PaymentPlanPayment` DROP FOREIGN KEY `PaymentPlanPayment_paymentPlanId_fkey`;

-- DropForeignKey
ALTER TABLE `PersonEmail` DROP FOREIGN KEY `PersonEmail_personId_fkey`;

-- DropForeignKey
ALTER TABLE `PersonPhone` DROP FOREIGN KEY `PersonPhone_personId_fkey`;

-- DropForeignKey
ALTER TABLE `Product` DROP FOREIGN KEY `Product_brandId_fkey`;

-- DropForeignKey
ALTER TABLE `ProductStock` DROP FOREIGN KEY `ProductStock_buildingId_fkey`;

-- DropForeignKey
ALTER TABLE `ProductStock` DROP FOREIGN KEY `ProductStock_productId_fkey`;

-- DropForeignKey
ALTER TABLE `ProductsDispatchNotes` DROP FOREIGN KEY `ProductsDispatchNotes_dispatchNoteId_fkey`;

-- DropForeignKey
ALTER TABLE `ProductsDispatchNotes` DROP FOREIGN KEY `ProductsDispatchNotes_productCode_fkey`;

-- DropForeignKey
ALTER TABLE `Provider` DROP FOREIGN KEY `Provider_companyId_fkey`;

-- DropForeignKey
ALTER TABLE `Provider` DROP FOREIGN KEY `Provider_preferredPaymentPlanId_fkey`;

-- DropForeignKey
ALTER TABLE `Tax` DROP FOREIGN KEY `Tax_companyId_fkey`;

-- DropForeignKey
ALTER TABLE `UserSession` DROP FOREIGN KEY `UserSession_userId_fkey`;

-- AddForeignKey
ALTER TABLE `PersonPhone` ADD CONSTRAINT `PersonPhone_personId_fkey` FOREIGN KEY (`personId`) REFERENCES `Person`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PersonEmail` ADD CONSTRAINT `PersonEmail_personId_fkey` FOREIGN KEY (`personId`) REFERENCES `Person`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserSession` ADD CONSTRAINT `UserSession_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Contact` ADD CONSTRAINT `Contact_personId_fkey` FOREIGN KEY (`personId`) REFERENCES `Person`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Contact` ADD CONSTRAINT `Contact_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `Company`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Company` ADD CONSTRAINT `Company_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `Company`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PaymentPlan` ADD CONSTRAINT `PaymentPlan_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `Company`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PaymentPlanPayment` ADD CONSTRAINT `PaymentPlanPayment_paymentPlanId_fkey` FOREIGN KEY (`paymentPlanId`) REFERENCES `PaymentPlan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tax` ADD CONSTRAINT `Tax_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `Company`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Provider` ADD CONSTRAINT `Provider_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `Company`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Provider` ADD CONSTRAINT `Provider_preferredPaymentPlanId_fkey` FOREIGN KEY (`preferredPaymentPlanId`) REFERENCES `PaymentPlan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Brand` ADD CONSTRAINT `Brand_providerId_fkey` FOREIGN KEY (`providerId`) REFERENCES `Provider`(`companyId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_brandId_fkey` FOREIGN KEY (`brandId`) REFERENCES `Brand`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Building` ADD CONSTRAINT `Building_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `Company`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductStock` ADD CONSTRAINT `ProductStock_buildingId_fkey` FOREIGN KEY (`buildingId`) REFERENCES `Building`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductStock` ADD CONSTRAINT `ProductStock_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`code`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DispatchNote` ADD CONSTRAINT `DispatchNote_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `Company`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductsDispatchNotes` ADD CONSTRAINT `ProductsDispatchNotes_productCode_fkey` FOREIGN KEY (`productCode`) REFERENCES `Product`(`code`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductsDispatchNotes` ADD CONSTRAINT `ProductsDispatchNotes_dispatchNoteId_fkey` FOREIGN KEY (`dispatchNoteId`) REFERENCES `DispatchNote`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Invoice` ADD CONSTRAINT `Invoice_sellerId_fkey` FOREIGN KEY (`sellerId`) REFERENCES `Company`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Invoice` ADD CONSTRAINT `Invoice_buyerId_fkey` FOREIGN KEY (`buyerId`) REFERENCES `Company`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Invoice` ADD CONSTRAINT `Invoice_paymentPlanId_fkey` FOREIGN KEY (`paymentPlanId`) REFERENCES `PaymentPlan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Invoice` ADD CONSTRAINT `Invoice_dispatchNoteId_fkey` FOREIGN KEY (`dispatchNoteId`) REFERENCES `DispatchNote`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DueDate` ADD CONSTRAINT `DueDate_invoiceId_fkey` FOREIGN KEY (`invoiceId`) REFERENCES `Invoice`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InvoiceProducts` ADD CONSTRAINT `InvoiceProducts_invoiceId_fkey` FOREIGN KEY (`invoiceId`) REFERENCES `Invoice`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InvoiceProducts` ADD CONSTRAINT `InvoiceProducts_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`code`) ON DELETE CASCADE ON UPDATE CASCADE;
