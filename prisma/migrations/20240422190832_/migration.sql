/*
  Warnings:

  - You are about to drop the column `sentbByMe` on the `Message` table. All the data in the column will be lost.
  - Added the required column `sentByMe` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Message" DROP COLUMN "sentbByMe",
ADD COLUMN     "sentByMe" BOOLEAN NOT NULL;
