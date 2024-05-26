/*
  Warnings:

  - You are about to drop the column `occupants` on the `House` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "House" DROP COLUMN "occupants",
ADD COLUMN     "occupied" INTEGER NOT NULL DEFAULT 0;
