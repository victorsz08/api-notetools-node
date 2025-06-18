/*
  Warnings:

  - Added the required column `userId` to the `Team` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Team" ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "OwnerTeam" (
    "owner_id" TEXT NOT NULL,
    "team_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OwnerTeam_pkey" PRIMARY KEY ("owner_id","team_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OwnerTeam_owner_id_key" ON "OwnerTeam"("owner_id");

-- CreateIndex
CREATE UNIQUE INDEX "OwnerTeam_team_id_key" ON "OwnerTeam"("team_id");

-- AddForeignKey
ALTER TABLE "OwnerTeam" ADD CONSTRAINT "OwnerTeam_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OwnerTeam" ADD CONSTRAINT "OwnerTeam_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
