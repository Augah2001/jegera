/*
  Warnings:

  - A unique constraint covering the columns `[authorizationKey]` on the table `House` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "House" ADD COLUMN     "authorizationKey" TEXT NOT NULL DEFAULT 'augah';

-- CreateIndex
CREATE UNIQUE INDEX "House_authorizationKey_key" ON "House"("authorizationKey");
