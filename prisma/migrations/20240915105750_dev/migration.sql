-- CreateEnum
CREATE TYPE "AccessStatus" AS ENUM ('ACTIVE', 'REVOGED');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "accessStatus" "AccessStatus" DEFAULT 'ACTIVE';

-- CreateTable
CREATE TABLE "Countries" (
    "id" INTEGER NOT NULL,
    "country" TEXT NOT NULL,
    "uf" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Countries_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Countries_id_key" ON "Countries"("id");
