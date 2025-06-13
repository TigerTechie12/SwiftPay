/*
  Warnings:

  - You are about to drop the column `number` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Balance` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Merchant` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OnRampTransaction` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `email` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Balance" DROP CONSTRAINT "Balance_userId_fkey";

-- DropForeignKey
ALTER TABLE "OnRampTransaction" DROP CONSTRAINT "OnRampTransaction_userId_fkey";

-- DropIndex
DROP INDEX "User_number_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "number",
DROP COLUMN "password",
ALTER COLUMN "email" SET NOT NULL;

-- DropTable
DROP TABLE "Balance";

-- DropTable
DROP TABLE "Merchant";

-- DropTable
DROP TABLE "OnRampTransaction";

-- DropEnum
DROP TYPE "AuthType";

-- DropEnum
DROP TYPE "OnRampStatus";
