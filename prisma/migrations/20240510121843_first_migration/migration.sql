/*
  Warnings:

  - Made the column `authorizationKey` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "authorizationKey" SET NOT NULL;
