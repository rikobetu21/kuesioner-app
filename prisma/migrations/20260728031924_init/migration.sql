/*
  Warnings:

  - Added the required column `feedback` to the `Submission` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Submission" ADD COLUMN     "feedback" TEXT NOT NULL,
ADD COLUMN     "imageData" BYTEA,
ADD COLUMN     "imageMimeType" TEXT,
ADD COLUMN     "imageName" TEXT,
ADD COLUMN     "screenshotData" BYTEA,
ADD COLUMN     "screenshotMimeType" TEXT,
ADD COLUMN     "screenshotName" TEXT;
