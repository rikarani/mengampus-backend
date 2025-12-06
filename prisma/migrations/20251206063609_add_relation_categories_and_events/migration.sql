/*
  Warnings:

  - You are about to drop the column `category` on the `events` table. All the data in the column will be lost.
  - Added the required column `category_id` to the `events` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `events` DROP COLUMN `category`,
    ADD COLUMN `category_id` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `events` ADD CONSTRAINT `events_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
