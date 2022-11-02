/*
  Warnings:

  - The `action` column on the `Step` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[orderNumber]` on the table `Test` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "Actions" AS ENUM ('tap', 'type', 'goto', 'click', 'focus', 'hover', 'goBack', 'reload', 'select', 'goForward', 'setGeolocation', 'waitForTimeout', 'waitForSelector', 'waitForNavigation', 'waitForNetworkIdle', 'setExtraHTTPHeaders');

-- AlterTable
ALTER TABLE "Step" DROP COLUMN "action",
ADD COLUMN     "action" "Actions";

-- AlterTable
ALTER TABLE "Test" ADD COLUMN     "orderNumber" SERIAL NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Test_orderNumber_key" ON "Test"("orderNumber");
