-- CreateTable
CREATE TABLE "_MeetupFollower" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_MeetupFollower_AB_unique" ON "_MeetupFollower"("A", "B");

-- CreateIndex
CREATE INDEX "_MeetupFollower_B_index" ON "_MeetupFollower"("B");

-- AddForeignKey
ALTER TABLE "Meetups" ADD CONSTRAINT "Meetups_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MeetupFollower" ADD CONSTRAINT "_MeetupFollower_A_fkey" FOREIGN KEY ("A") REFERENCES "Meetups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MeetupFollower" ADD CONSTRAINT "_MeetupFollower_B_fkey" FOREIGN KEY ("B") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
