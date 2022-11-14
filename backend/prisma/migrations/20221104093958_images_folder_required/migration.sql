/*
  Warnings:

  - Made the column `imagesFolder` on table `Tester` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Tester" ALTER COLUMN "imagesFolder" SET NOT NULL;
