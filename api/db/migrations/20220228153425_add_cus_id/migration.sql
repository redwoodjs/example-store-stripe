/*
  Warnings:

  - Added the required column `customerId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "customerId" TEXT NOT NULL DEFAULT cus00001;
