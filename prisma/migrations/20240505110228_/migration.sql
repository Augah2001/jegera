/*
  Warnings:

  - You are about to drop the column `backGroundImage` on the `House` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "House" DROP COLUMN "backGroundImage",
ADD COLUMN     "backgroundImage" TEXT;
