/*
  Warnings:

  - Added the required column `farm_id` to the `harvests` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "harvests" ADD COLUMN     "farm_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "farms" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "farm_name" TEXT NOT NULL,
    "farm_area" DOUBLE PRECISION NOT NULL,
    "farm_location" TEXT NOT NULL,
    "farm_soil_type" TEXT NOT NULL,

    CONSTRAINT "farms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_Harvests" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_Harvests_AB_unique" ON "_Harvests"("A", "B");

-- CreateIndex
CREATE INDEX "_Harvests_B_index" ON "_Harvests"("B");

-- AddForeignKey
ALTER TABLE "_Harvests" ADD CONSTRAINT "_Harvests_A_fkey" FOREIGN KEY ("A") REFERENCES "farms"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Harvests" ADD CONSTRAINT "_Harvests_B_fkey" FOREIGN KEY ("B") REFERENCES "harvests"("id") ON DELETE CASCADE ON UPDATE CASCADE;
