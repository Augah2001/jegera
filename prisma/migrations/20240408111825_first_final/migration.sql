-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('male', 'female', 'both');

-- CreateTable
CREATE TABLE "House" (
    "id" SERIAL NOT NULL,
    "locationId" INTEGER NOT NULL,
    "houseNumber" INTEGER NOT NULL,
    "street" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "minutes" INTEGER NOT NULL,
    "capacity" INTEGER NOT NULL,
    "occupied" BOOLEAN NOT NULL,
    "perRoom" INTEGER NOT NULL,
    "gender" "Gender" NOT NULL,
    "images" TEXT[],
    "backGroundImage" TEXT NOT NULL,
    "curfew" INTEGER NOT NULL,
    "ownerId" INTEGER NOT NULL,

    CONSTRAINT "House_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Service" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "owner" (
    "id" SERIAL NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "houseId" INTEGER NOT NULL,

    CONSTRAINT "owner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_HouseToService" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Service_name_key" ON "Service"("name");

-- CreateIndex
CREATE UNIQUE INDEX "owner_ownerId_key" ON "owner"("ownerId");

-- CreateIndex
CREATE UNIQUE INDEX "_HouseToService_AB_unique" ON "_HouseToService"("A", "B");

-- CreateIndex
CREATE INDEX "_HouseToService_B_index" ON "_HouseToService"("B");

-- AddForeignKey
ALTER TABLE "House" ADD CONSTRAINT "House_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "House" ADD CONSTRAINT "House_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "owner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "owner" ADD CONSTRAINT "owner_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_HouseToService" ADD CONSTRAINT "_HouseToService_A_fkey" FOREIGN KEY ("A") REFERENCES "House"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_HouseToService" ADD CONSTRAINT "_HouseToService_B_fkey" FOREIGN KEY ("B") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;
