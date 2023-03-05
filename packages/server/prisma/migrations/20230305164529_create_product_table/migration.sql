-- AlterTable
ALTER TABLE `Provider` MODIFY `preferredGeneralDiscount` INTEGER NULL DEFAULT 0; -- Pequeña corrección para seguir la filosofía de trabajar con la unidad fraccionaria

-- CreateTable
CREATE TABLE `Product` (
    `code` VARCHAR(40) NOT NULL,
    `internal_code` VARCHAR(30) NOT NULL,
    `cost` INTEGER NULL,
    `price` INTEGER NOT NULL,
    `brandId` INTEGER NOT NULL,

    PRIMARY KEY (`code`, `brandId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_brandId_fkey` FOREIGN KEY (`brandId`) REFERENCES `Brand`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
