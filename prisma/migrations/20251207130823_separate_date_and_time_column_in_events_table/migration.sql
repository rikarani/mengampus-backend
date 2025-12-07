/*
  Warnings:

  - You are about to alter the column `ban_expires` on the `users` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Added the required column `time` to the `events` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `events` ADD COLUMN `time` VARCHAR(191) NOT NULL,
    MODIFY `date` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `ban_expires` DATETIME NULL;
