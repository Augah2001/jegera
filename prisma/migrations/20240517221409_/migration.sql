/*
  Warnings:

  - You are about to drop the column `updated` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Chat" ADD COLUMN     "updated" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "User" DROP COLUMN "updated";
