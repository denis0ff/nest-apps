/*
  Warnings:

  - Added the required column `ownerId` to the `Meetups` table without a default value. This is not possible if the table is not empty.
  - Added the required column `place` to the `Meetups` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Meetups" ADD COLUMN     "ownerId" INTEGER NOT NULL,
ADD COLUMN     "place" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Tags" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "Tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MeetupsWithTags" (
    "id" SERIAL NOT NULL,
    "meetupId" INTEGER NOT NULL,
    "tagId" INTEGER NOT NULL,

    CONSTRAINT "MeetupsWithTags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Members" (
    "id" SERIAL NOT NULL,
    "meetupId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Members_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tags_id_key" ON "Tags"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Tags_title_key" ON "Tags"("title");

-- CreateIndex
CREATE UNIQUE INDEX "MeetupsWithTags_id_key" ON "MeetupsWithTags"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Members_id_key" ON "Members"("id");

-- AddForeignKey
ALTER TABLE "MeetupsWithTags" ADD CONSTRAINT "MeetupsWithTags_meetupId_fkey" FOREIGN KEY ("meetupId") REFERENCES "Meetups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MeetupsWithTags" ADD CONSTRAINT "MeetupsWithTags_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tags"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Members" ADD CONSTRAINT "Members_meetupId_fkey" FOREIGN KEY ("meetupId") REFERENCES "Meetups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
