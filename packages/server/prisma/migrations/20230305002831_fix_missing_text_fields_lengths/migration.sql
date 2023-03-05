/*
  Warnings:

  - You are about to alter the column `name` on the `Person` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(45)`.
  - You are about to alter the column `surnames` on the `Person` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(75)`.
  - You are about to alter the column `email` on the `PersonEmail` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(65)`.
  - You are about to alter the column `phone` on the `PersonPhone` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(18)`.
  - You are about to alter the column `email` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(60)`.
  - You are about to alter the column `password` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(70)`.

*/
-- AlterTable
ALTER TABLE `Person` MODIFY `name` VARCHAR(45) NOT NULL,
    MODIFY `surnames` VARCHAR(75) NOT NULL;

-- AlterTable
ALTER TABLE `PersonEmail` MODIFY `email` VARCHAR(65) NOT NULL;

-- AlterTable
ALTER TABLE `PersonPhone` MODIFY `phone` VARCHAR(18) NOT NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `email` VARCHAR(60) NOT NULL,
    MODIFY `password` VARCHAR(70) NOT NULL;
