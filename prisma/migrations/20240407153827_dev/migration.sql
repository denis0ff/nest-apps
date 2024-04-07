/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Meetups` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'USER', 'ORGANIZER');

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "hashedRefreshToken" TEXT,
ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'USER';

-- CreateIndex
CREATE UNIQUE INDEX "Meetups_title_key" ON "Meetups"("title");
