-- CreateEnum
CREATE TYPE "TypeContract" AS ENUM ('BASE', 'PROSPECT');

-- AlterTable
ALTER TABLE "Contract" ADD COLUMN     "type" "TypeContract";

-- CreateTable
CREATE TABLE "Goals" (
    "id" TEXT NOT NULL,
    "goal" DOUBLE PRECISION NOT NULL,
    "user_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Goals_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Goals" ADD CONSTRAINT "Goals_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
