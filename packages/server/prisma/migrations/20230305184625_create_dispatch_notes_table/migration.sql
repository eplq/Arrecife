-- CreateTable
CREATE TABLE `DispatchNote` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `number` VARCHAR(40) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `dispatched` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `companyId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProductsDispatchNotes` (
    `productCode` VARCHAR(191) NOT NULL,
    `dispatchNoteId` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`productCode`, `dispatchNoteId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `DispatchNote` ADD CONSTRAINT `DispatchNote_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `Company`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductsDispatchNotes` ADD CONSTRAINT `ProductsDispatchNotes_productCode_fkey` FOREIGN KEY (`productCode`) REFERENCES `Product`(`code`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductsDispatchNotes` ADD CONSTRAINT `ProductsDispatchNotes_dispatchNoteId_fkey` FOREIGN KEY (`dispatchNoteId`) REFERENCES `DispatchNote`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
