/*
  Warnings:

  - You are about to drop the column `authoizationKey` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[authorizationKey]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "User_authoizationKey_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "authoizationKey",
ADD COLUMN     "authorizationKey" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_authorizationKey_key" ON "User"("authorizationKey");
