-- CreateTable
CREATE TABLE `Brand` (
    `id` INTEGER NOT NULL,
    `name` VARCHAR(150) NOT NULL,
    `providerId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Brand` ADD CONSTRAINT `Brand_providerId_fkey` FOREIGN KEY (`providerId`) REFERENCES `Provider`(`companyId`) ON DELETE RESTRICT ON UPDATE CASCADE;
