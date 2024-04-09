/*
  Warnings:

  - You are about to drop the `owner` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "House" DROP CONSTRAINT "House_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "owner" DROP CONSTRAINT "owner_ownerId_fkey";

-- DropTable
DROP TABLE "owner";
