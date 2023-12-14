import { readFileSync } from "fs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const defaultValues = {
  reviewId: "",
  reviewerName: "",
  reviewText: "",
  publishedAt : new Date(),
  rating: null,
  responseFromOwnerText: "",
  responseFromOwnerDate: null,
  reviewLikesCount: 0,
  totalNumberOfReviewsByReviewer: 0,
  totalNumberOfPhotosByReviewer: 0,
  reviewerUrl: "",
  isLocalGuide: false,
  reviewTranslatedText: "",
  responseFromOwnerTranslatedText: ""
};

export const extractRelevantData = (reviews) =>
  reviews.map((item) => {
    let obj = {};
    for (let key in defaultValues) {
      obj[key] = item[key] || defaultValues[key];
    }
    if (obj['publishedAt']) obj['publishedAt'] = new Date(obj['publishedAt']);
    if (obj['responseFromOwnerDate']) obj['responseFromOwnerDate'] = new Date(obj['responseFromOwnerDate']);
    return obj;
  });

const upsertData = async (model, where, create) => {
  return prisma[model].upsert({
    where,
    update: {},
    create,
  });
};

export const importReviews = async (filePath, userId) => {
  try {
    const jsonData = JSON.parse(readFileSync(filePath, "utf8"));

    for (const businessData of jsonData) {
      if (!businessData.address) {
        console.error(`Address is missing for business: ${businessData.name}`);
        continue;
      }

      const business = await upsertData("business", { placeId: businessData.place_id }, {
          userId,
          placeId: businessData.place_id,
          name: businessData.name,
          description: businessData.description,
          isSpendingOnAds: businessData.is_spending_on_ads,
          reviewCount: businessData.reviews,
          averageRating: businessData.rating || 0,
          website: businessData.website,
          featuredImage: businessData.featured_image,
          mainCategory: businessData.main_category,
          categories: businessData.categories,
          workdayTiming: businessData.workday_timing,
          closedOn: businessData.closed_on,
          phone: businessData.phone,
          address: businessData.address
        });

      const extractedReviews = extractRelevantData(businessData.detailed_reviews);
      for (const reviewData of extractedReviews) {
        await upsertData("detailedReview", { reviewId: reviewData.reviewId }, {
            userId,
            businessId: business.id,
            ...reviewData,
          });
      }
    }

    return { message: "Data imported successfully" };
  } catch (error) {
    console.error("Error in importReviews:", error);
    throw error;
  }
};
