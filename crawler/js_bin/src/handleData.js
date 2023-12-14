import { readFileSync } from "fs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Helper function to create a Date from a string or return null if the string is empty
const createDateOrNull = (dateString) => (dateString ? new Date(dateString) : null);

// Helper function to create a new review object with appropriate defaults
const createReviewObject = (item) => ({
  reviewId: item.review_id || null,
  reviewerName: item.reviewer_name || "",
  reviewText: item.review_text || "",
  publishedAt: createDateOrNull(item.published_at_date) || new Date(),
  rating: item.rating || null,
  responseFromOwnerText: item.response_from_owner_text || "",
  responseFromOwnerDate: createDateOrNull(item.response_from_owner_date),
  reviewLikesCount: item.review_likes_count || 0,
  totalNumberOfReviewsByReviewer: item.total_number_of_reviews_by_reviewer || 0,
  totalNumberOfPhotosByReviewer: item.total_number_of_photos_by_reviewer || 0,
  reviewerUrl: item.reviewer_url || "",
  isLocalGuide: item.is_local_guide || false,
  reviewTranslatedText: item.review_translated_text || "",
  responseFromOwnerTranslatedText: item.response_from_owner_translated_text || "",
});

export const extractRelevantData = (reviews) => reviews.map(createReviewObject);

export const importReviews = async (filePath, userId) => {
  try {
    const jsonString = readFileSync(filePath, "utf8");
    const jsonData = JSON.parse(jsonString);

    for (const businessData of jsonData) {
      if (!businessData.address) {
        console.error(`Address is missing for business: ${businessData.name}`);
        continue;
      }

      const business = await prisma.business.upsert({
        where: { placeId: businessData.place_id },
        update: {},
        create: {
          id: businessData.id,
          userId,
          placeId: businessData.place_id,
          name: businessData.name,
          description: businessData.description,
          isSpendingOnAds: businessData.is_spending_on_ads || false, // Use false as a default
          reviewCount: businessData.review_count || 0, // Use 0 as a default
          averageRating: businessData.rating || 0,
          website: businessData.website || "",
          featuredImage: businessData.featured_image || "",
          mainCategory: businessData.main_category || "",
          categories: businessData.categories || "",
          workdayTiming: businessData.workday_timing || "",
          closedOn: businessData.closed_on || "",
          phone: businessData.phone || "",
          address: businessData.address,
        },
      });

      const extractedReviews = extractRelevantData(businessData.detailed_reviews || []);
      for (const reviewData of extractedReviews) {
        await prisma.detailedReview.upsert({
          where: { reviewId: reviewData.reviewId },
          update: {},
          create: {
            userId,
            businessId: business.id,
            ...reviewData,
          },
        });
      }
    }

    return { message: "Data imported successfully" };
  } catch (error) {
    console.error("Error in importReviews:", error);
    throw error;
  }
};
