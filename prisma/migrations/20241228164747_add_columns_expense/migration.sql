/*
  Warnings:

  - Added the required column `type` to the `Expense` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ExpenseType" AS ENUM ('ONE_TIME', 'INSTALLMENTS', 'RECURRING');

-- CreateEnum
CREATE TYPE "Frequency" AS ENUM ('MONTHLY', 'YEARLY', 'WEEKLY');

-- AlterTable
ALTER TABLE "Expense" ADD COLUMN     "frequency" "Frequency",
ADD COLUMN     "installments" INTEGER,
ADD COLUMN     "type" "ExpenseType" NOT NULL;
