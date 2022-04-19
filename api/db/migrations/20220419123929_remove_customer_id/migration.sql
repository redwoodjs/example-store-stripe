/*
  Warnings:

  - You are about to drop the column `customerId` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_customerId_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "customerId",
ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "User_id_seq";
