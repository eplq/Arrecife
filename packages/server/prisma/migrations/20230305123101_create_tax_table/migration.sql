-- CreateTable
CREATE TABLE `Tax` (
    `id` INTEGER NOT NULL,
    `name` VARCHAR(45) NOT NULL,
    `rate` INTEGER NOT NULL,
    `companyId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Tax` ADD CONSTRAINT `Tax_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `Company`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
