-- CreateTable
CREATE TABLE `UserSession` (
    `userId` INTEGER NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    UNIQUE INDEX `UserSession_userId_key`(`userId`),
    PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserSession` ADD CONSTRAINT `UserSession_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`personId`) ON DELETE RESTRICT ON UPDATE CASCADE;
