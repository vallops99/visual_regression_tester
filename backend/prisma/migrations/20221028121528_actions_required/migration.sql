/*
  Warnings:

  - Made the column `action` on table `Step` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Step" ALTER COLUMN "action" SET NOT NULL;
