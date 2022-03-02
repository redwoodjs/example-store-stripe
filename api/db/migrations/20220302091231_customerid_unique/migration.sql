/*
  Warnings:

  - A unique constraint covering the columns `[customerId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Made the column `customerId` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "customerId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_customerId_key" ON "User"("customerId");
