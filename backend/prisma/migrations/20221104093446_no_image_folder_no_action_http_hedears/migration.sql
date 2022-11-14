/*
  Warnings:

  - The values [setExtraHTTPHeaders] on the enum `Actions` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `imagesFolder` on the `Tester` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Actions_new" AS ENUM ('tap', 'type', 'goto', 'click', 'focus', 'hover', 'goBack', 'reload', 'select', 'goForward', 'setGeolocation', 'waitForTimeout', 'waitForSelector', 'waitForNavigation', 'waitForNetworkIdle');
ALTER TABLE "Step" ALTER COLUMN "action" TYPE "Actions_new" USING ("action"::text::"Actions_new");
ALTER TYPE "Actions" RENAME TO "Actions_old";
ALTER TYPE "Actions_new" RENAME TO "Actions";
DROP TYPE "Actions_old";
COMMIT;

-- AlterTable
ALTER TABLE "Tester" DROP COLUMN "imagesFolder";
