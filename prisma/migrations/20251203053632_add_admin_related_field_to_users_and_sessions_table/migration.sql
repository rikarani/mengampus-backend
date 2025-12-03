-- AlterTable
ALTER TABLE `sessions` ADD COLUMN `impersonated_by` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `ban_expires` DATETIME(3) NULL,
    ADD COLUMN `ban_reason` VARCHAR(191) NULL,
    ADD COLUMN `banned` BOOLEAN NULL DEFAULT false,
    ADD COLUMN `role` VARCHAR(191) NULL DEFAULT 'user';
