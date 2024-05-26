/*
  Warnings:

  - The primary key for the `Service` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Service` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "_HouseToService" DROP CONSTRAINT "_HouseToService_B_fkey";

-- AlterTable
ALTER TABLE "Service" DROP CONSTRAINT "Service_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Service_pkey" PRIMARY KEY ("name");

-- AlterTable
ALTER TABLE "_HouseToService" ALTER COLUMN "B" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "_HouseToService" ADD CONSTRAINT "_HouseToService_B_fkey" FOREIGN KEY ("B") REFERENCES "Service"("name") ON DELETE CASCADE ON UPDATE CASCADE;
