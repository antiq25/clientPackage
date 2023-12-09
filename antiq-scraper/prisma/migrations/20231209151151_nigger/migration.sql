/*
  Warnings:

  - Changed the type of `viewCount` on the `Widget` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `clickCount` on the `Widget` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropIndex
DROP INDEX "Widget_businessId_key";

-- AlterTable
ALTER TABLE "Widget" DROP COLUMN "viewCount",
ADD COLUMN     "viewCount" INTEGER NOT NULL,
DROP COLUMN "clickCount",
ADD COLUMN     "clickCount" INTEGER NOT NULL;
