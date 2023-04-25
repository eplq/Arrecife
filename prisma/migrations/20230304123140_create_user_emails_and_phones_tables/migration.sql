-- CreateTable
CREATE TABLE `PersonPhone` (
    `personId` INTEGER NOT NULL,
    `phone` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `PersonPhone_personId_phone_key`(`personId`, `phone`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PersonEmail` (
    `personId` INTEGER NOT NULL,
    `email` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `PersonEmail_personId_email_key`(`personId`, `email`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PersonPhone` ADD CONSTRAINT `PersonPhone_personId_fkey` FOREIGN KEY (`personId`) REFERENCES `Person`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PersonEmail` ADD CONSTRAINT `PersonEmail_personId_fkey` FOREIGN KEY (`personId`) REFERENCES `Person`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
