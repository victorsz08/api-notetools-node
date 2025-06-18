/*
  Warnings:

  - You are about to drop the `OwnerTeam` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "OwnerTeam" DROP CONSTRAINT "OwnerTeam_owner_id_fkey";

-- DropForeignKey
ALTER TABLE "OwnerTeam" DROP CONSTRAINT "OwnerTeam_team_id_fkey";

-- DropTable
DROP TABLE "OwnerTeam";
