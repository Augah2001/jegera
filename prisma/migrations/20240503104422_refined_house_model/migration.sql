/*
  Warnings:

  - You are about to drop the column `occupied` on the `House` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "House" DROP COLUMN "occupied",
ADD COLUMN     "coordinates" INTEGER[],
ADD COLUMN     "occupants" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "backGroundImage" DROP NOT NULL;
