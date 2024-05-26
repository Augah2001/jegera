/*
  Warnings:

  - The values [authorize] on the enum `type` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "type_new" AS ENUM ('tenant', 'landlord', 'authorizer');
ALTER TABLE "User" ALTER COLUMN "accountType" TYPE "type_new" USING ("accountType"::text::"type_new");
ALTER TYPE "type" RENAME TO "type_old";
ALTER TYPE "type_new" RENAME TO "type";
DROP TYPE "type_old";
COMMIT;
