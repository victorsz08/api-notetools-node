-- CreateTable
CREATE TABLE "OwnerTeam" (
    "team_id" TEXT NOT NULL,
    "owner_id" TEXT NOT NULL,

    CONSTRAINT "OwnerTeam_pkey" PRIMARY KEY ("team_id","owner_id")
);

-- AddForeignKey
ALTER TABLE "OwnerTeam" ADD CONSTRAINT "OwnerTeam_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OwnerTeam" ADD CONSTRAINT "OwnerTeam_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
