/*
  Warnings:

  - You are about to drop the `MeetupsWithTags` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tags` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "MeetupsWithTags" DROP CONSTRAINT "MeetupsWithTags_meetupId_fkey";

-- DropForeignKey
ALTER TABLE "MeetupsWithTags" DROP CONSTRAINT "MeetupsWithTags_tagId_fkey";

-- AlterTable
ALTER TABLE "Meetups" ADD COLUMN     "tags" TEXT[];

-- DropTable
DROP TABLE "MeetupsWithTags";

-- DropTable
DROP TABLE "Tags";
