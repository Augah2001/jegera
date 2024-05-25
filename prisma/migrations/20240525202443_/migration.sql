-- CreateTable
CREATE TABLE "HouseAuth" (
    "authorizationKey" TEXT NOT NULL,
    "fullName" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "HouseAuth_authorizationKey_key" ON "HouseAuth"("authorizationKey");
