-- CreateTable
CREATE TABLE "Auth" (
    "authorizationKey" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Auth_authorizationKey_key" ON "Auth"("authorizationKey");
