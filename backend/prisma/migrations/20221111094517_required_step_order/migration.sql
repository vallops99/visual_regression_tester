/*
  Warnings:

  - Made the column `order` on table `Step` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Step" ALTER COLUMN "order" SET NOT NULL;
