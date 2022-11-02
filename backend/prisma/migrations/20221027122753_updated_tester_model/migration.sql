/*
  Warnings:

  - You are about to drop the column `basePath` on the `Test` table. All the data in the column will be lost.
  - You are about to drop the column `imagesFolder` on the `Test` table. All the data in the column will be lost.
  - Added the required column `basePath` to the `Tester` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imagesFolder` to the `Tester` table without a default value. This is not possible if the table is not empty.
  - Added the required column `threshold` to the `Tester` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Test" DROP COLUMN "basePath",
DROP COLUMN "imagesFolder";

-- AlterTable
ALTER TABLE "Tester" ADD COLUMN     "basePath" VARCHAR(2048) NOT NULL,
ADD COLUMN     "imagesFolder" VARCHAR(100) NOT NULL,
ADD COLUMN     "threshold" INTEGER NOT NULL;
