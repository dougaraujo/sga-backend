-- CreateTable
CREATE TABLE "harvests" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "harvest_name" TEXT NOT NULL,
    "crop_id" INTEGER NOT NULL,

    CONSTRAINT "harvests_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "harvests" ADD CONSTRAINT "harvests_crop_id_fkey" FOREIGN KEY ("crop_id") REFERENCES "crops"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
