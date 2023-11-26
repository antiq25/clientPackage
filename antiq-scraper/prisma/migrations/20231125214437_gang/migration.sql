/*
  Warnings:

  - You are about to drop the column `createdAt` on the `DetailedReview` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[placeId]` on the table `Business` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[reviewId]` on the table `DetailedReview` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `placeId` to the `Business` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Business` table without a default value. This is not possible if the table is not empty.
  - Made the column `address` on table `Business` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `publishedAt` to the `DetailedReview` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reviewId` to the `DetailedReview` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reviewerName` to the `DetailedReview` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `DetailedReview` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Business" ADD COLUMN     "placeId" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL,
ALTER COLUMN "address" SET NOT NULL;

-- AlterTable
ALTER TABLE "DetailedReview" DROP COLUMN "createdAt",
ADD COLUMN     "publishedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "reviewId" TEXT NOT NULL,
ADD COLUMN     "reviewerName" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Business_placeId_key" ON "Business"("placeId");

-- CreateIndex
CREATE UNIQUE INDEX "DetailedReview_reviewId_key" ON "DetailedReview"("reviewId");
