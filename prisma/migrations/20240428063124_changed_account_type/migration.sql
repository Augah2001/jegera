/*
  Warnings:

  - You are about to drop the column `AccountType` on the `User` table. All the data in the column will be lost.
  - Added the required column `accountType` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "AccountType",
ADD COLUMN     "accountType" "type" NOT NULL;
