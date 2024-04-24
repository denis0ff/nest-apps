/*
  Warnings:

  - You are about to drop the `Meetups` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Meetups" DROP CONSTRAINT "Meetups_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "Members" DROP CONSTRAINT "Members_meetupId_fkey";

-- DropForeignKey
ALTER TABLE "_MeetupFollower" DROP CONSTRAINT "_MeetupFollower_A_fkey";

-- DropTable
DROP TABLE "Meetups";

-- CreateTable
CREATE TABLE "Meetup" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "place" TEXT NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "tags" TEXT[],
    "lat" DOUBLE PRECISION NOT NULL,
    "long" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Meetup_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Meetup_id_key" ON "Meetup"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Meetup_title_key" ON "Meetup"("title");

-- AddForeignKey
ALTER TABLE "Meetup" ADD CONSTRAINT "Meetup_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Members" ADD CONSTRAINT "Members_meetupId_fkey" FOREIGN KEY ("meetupId") REFERENCES "Meetup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MeetupFollower" ADD CONSTRAINT "_MeetupFollower_A_fkey" FOREIGN KEY ("A") REFERENCES "Meetup"("id") ON DELETE CASCADE ON UPDATE CASCADE;
