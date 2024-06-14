/*
  Warnings:

  - You are about to drop the column `accountType` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `authorizationKey` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `backgroundImage` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `gender` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `isAuthorizer` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `isOnline` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Auth` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Chat` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `House` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `HouseAuth` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Location` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Login` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Message` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Service` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Transaction` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ChatToUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_HouseToService` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "House" DROP CONSTRAINT "House_locationId_fkey";

-- DropForeignKey
ALTER TABLE "House" DROP CONSTRAINT "House_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "Login" DROP CONSTRAINT "Login_userId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_chatId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_receiverId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_senderId_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_houseId_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_receiverId_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_senderId_fkey";

-- DropForeignKey
ALTER TABLE "_ChatToUser" DROP CONSTRAINT "_ChatToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_ChatToUser" DROP CONSTRAINT "_ChatToUser_B_fkey";

-- DropForeignKey
ALTER TABLE "_HouseToService" DROP CONSTRAINT "_HouseToService_A_fkey";

-- DropForeignKey
ALTER TABLE "_HouseToService" DROP CONSTRAINT "_HouseToService_B_fkey";

-- DropIndex
DROP INDEX "User_authorizationKey_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "accountType",
DROP COLUMN "authorizationKey",
DROP COLUMN "backgroundImage",
DROP COLUMN "gender",
DROP COLUMN "isAuthorizer",
DROP COLUMN "isOnline";

-- DropTable
DROP TABLE "Auth";

-- DropTable
DROP TABLE "Chat";

-- DropTable
DROP TABLE "House";

-- DropTable
DROP TABLE "HouseAuth";

-- DropTable
DROP TABLE "Location";

-- DropTable
DROP TABLE "Login";

-- DropTable
DROP TABLE "Message";

-- DropTable
DROP TABLE "Service";

-- DropTable
DROP TABLE "Transaction";

-- DropTable
DROP TABLE "_ChatToUser";

-- DropTable
DROP TABLE "_HouseToService";

-- DropEnum
DROP TYPE "Gender";

-- DropEnum
DROP TYPE "genderType";

-- DropEnum
DROP TYPE "status";

-- DropEnum
DROP TYPE "type";
