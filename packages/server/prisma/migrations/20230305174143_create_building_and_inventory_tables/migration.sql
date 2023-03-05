/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE `Building` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(70) NOT NULL,
    `address` VARCHAR(70) NOT NULL,
    `phone` VARCHAR(18) NOT NULL,
    `type` ENUM('WAREHOUSE', 'STORE') NOT NULL DEFAULT 'STORE',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProductStock` (
    `buildingId` INTEGER NOT NULL,
    `productId` VARCHAR(191) NOT NULL,
    `quantity` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`buildingId`, `productId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Product_code_key` ON `Product`(`code`);

-- AddForeignKey
ALTER TABLE `ProductStock` ADD CONSTRAINT `ProductStock_buildingId_fkey` FOREIGN KEY (`buildingId`) REFERENCES `Building`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductStock` ADD CONSTRAINT `ProductStock_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`code`) ON DELETE RESTRICT ON UPDATE CASCADE;
