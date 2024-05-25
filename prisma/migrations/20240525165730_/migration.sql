/*
  Warnings:

  - The values [authorizer] on the enum `type` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `fullName` to the `Auth` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "type_new" AS ENUM ('tenant', 'landlord', 'authorize');
ALTER TABLE "User" ALTER COLUMN "accountType" TYPE "type_new" USING ("accountType"::text::"type_new");
ALTER TYPE "type" RENAME TO "type_old";
ALTER TYPE "type_new" RENAME TO "type";
DROP TYPE "type_old";
COMMIT;

-- AlterTable
ALTER TABLE "Auth" ADD COLUMN     "fullName" TEXT NOT NULL;
