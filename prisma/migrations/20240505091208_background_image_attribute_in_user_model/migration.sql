-- AlterTable
ALTER TABLE "House" ALTER COLUMN "street" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "backgroundImage" TEXT NOT NULL DEFAULT 'images/profile_pictures/dlzmprvxcug8pgq5ucxx';
