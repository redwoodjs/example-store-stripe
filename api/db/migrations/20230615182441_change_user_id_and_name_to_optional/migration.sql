-- AlterTable
ALTER TABLE "User" ADD COLUMN     "stripeId" TEXT,
ALTER COLUMN "name" DROP NOT NULL;
