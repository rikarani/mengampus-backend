-- AlterTable
ALTER TABLE `sessions` ADD COLUMN `impersonated_by` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `ban_expires` DATETIME NULL,
    ADD COLUMN `ban_reason` TEXT NULL,
    ADD COLUMN `banned` BOOLEAN NULL DEFAULT false;
