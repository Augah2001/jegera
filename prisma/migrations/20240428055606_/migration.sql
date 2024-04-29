/*
  Warnings:

  - You are about to drop the column `type` on the `User` table. All the data in the column will be lost.
  - Added the required column `AccountType` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "type",
ADD COLUMN     "AccountType" "type" NOT NULL,
ADD COLUMN     "isAuthorizer" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "isOnline" SET DEFAULT false;
