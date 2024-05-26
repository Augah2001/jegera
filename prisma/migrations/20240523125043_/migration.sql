/*
  Warnings:

  - Added the required column `predictedPrice` to the `House` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "House" ADD COLUMN     "predictedPrice" DOUBLE PRECISION NOT NULL;
