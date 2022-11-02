/*
  Warnings:

  - Added the required column `testerId` to the `Test` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Test" ADD COLUMN     "isLogin" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "testerId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Tester" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Tester_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Test" ADD CONSTRAINT "Test_testerId_fkey" FOREIGN KEY ("testerId") REFERENCES "Tester"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
