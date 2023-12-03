-- CreateTable
CREATE TABLE "Business" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "placeId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "isSpendingOnAds" BOOLEAN NOT NULL DEFAULT false,
    "reviewCount" INTEGER NOT NULL,
    "averageRating" DOUBLE PRECISION NOT NULL,
    "website" TEXT,
    "featuredImage" TEXT,
    "mainCategory" TEXT,
    "categories" TEXT[],
    "workdayTiming" TEXT,
    "closedOn" TEXT[],
    "phone" TEXT,
    "address" TEXT,

    CONSTRAINT "Business_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DetailedReview" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "businessId" TEXT NOT NULL,
    "reviewId" TEXT NOT NULL,
    "reviewerName" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "reviewText" TEXT,
    "publishedAt" TIMESTAMP(3) NOT NULL,
    "responseFromOwnerText" TEXT,
    "responseFromOwnerDate" TIMESTAMP(3),
    "reviewLikesCount" INTEGER NOT NULL DEFAULT 0,
    "totalNumberOfReviewsByReviewer" INTEGER NOT NULL DEFAULT 0,
    "totalNumberOfPhotosByReviewer" INTEGER,
    "reviewerUrl" TEXT,
    "isLocalGuide" BOOLEAN NOT NULL DEFAULT false,
    "reviewTranslatedText" TEXT,
    "responseFromOwnerTranslatedText" TEXT,

    CONSTRAINT "DetailedReview_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Business_placeId_key" ON "Business"("placeId");

-- CreateIndex
CREATE UNIQUE INDEX "DetailedReview_reviewId_key" ON "DetailedReview"("reviewId");

-- AddForeignKey
ALTER TABLE "DetailedReview" ADD CONSTRAINT "DetailedReview_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
