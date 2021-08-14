/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `cameras` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "cameras.email_unique" ON "cameras"("email");
