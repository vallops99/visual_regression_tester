/*
  Warnings:

  - You are about to drop the column `notified` on the `Test` table. All the data in the column will be lost.
  - You are about to drop the column `pending` on the `Test` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Test" DROP COLUMN "notified",
DROP COLUMN "pending";
