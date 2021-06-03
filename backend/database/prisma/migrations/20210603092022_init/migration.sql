/*
  Warnings:

  - You are about to alter the column `phone` on the `integrators` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `VarChar(13)`.

*/
-- AlterTable
ALTER TABLE "integrators" ALTER COLUMN "phone" SET DATA TYPE VARCHAR(13);
