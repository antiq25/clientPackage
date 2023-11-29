import { readFileSync } from "fs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// The extractRelevantData function as you provided
export const extractRelevantData = (reviews) =>
  reviews.map((item) => ({
    reviewId: item.review_id || null,
    reviewerName: item.reviewer_name || "",
    reviewText: item.review_text || "",
    publishedAt: item.published_at_date
      ? new Date(item.published_at_date)
      : new Date(),
    rating: item.rating || null,
    responseFromOwnerText: item.response_from_owner_text || "",
    responseFromOwnerDate: item.response_from_owner_date
      ? new Date(item.response_from_owner_date)
      : null,
    reviewLikesCount: item.review_likes_count || 0,
    totalNumberOfReviewsByReviewer:
      item.total_number_of_reviews_by_reviewer || 0,
    totalNumberOfPhotosByReviewer: item.total_number_of_photos_by_reviewer || 0,
    reviewerUrl: item.reviewer_url || "",
    isLocalGuide: item.is_local_guide || false,
    reviewTranslatedText: item.review_translated_text || "",
    responseFromOwnerTranslatedText:
      item.response_from_owner_translated_text || "",
  }));

export const importReviews = async (filePath, userId) => {
  try {
    const jsonData = JSON.parse(readFileSync(filePath, "utf8"));

    for (const businessData of jsonData) {
      // Check if the address is provided, if not, handle the error or skip the record
      if (!businessData.address) {
        console.error(`Address is missing for business: ${businessData.name}`);

        continue; // For this example, we'll skip this record
      }

      // Proceed with the upsert operation if the address is valid
      const business = await prisma.business.upsert({
        where: { placeId: businessData.place_id },
        update: {},
        create: {
          userId, // Reference to the User ID from the other database
          placeId: businessData.place_id,
          name: businessData.name,
          description: businessData.description,
          isSpendingOnAds: businessData.is_spending_on_ads,
          reviewCount: businessData.reviews,
          averageRating: businessData.rating || 0, // Use 0 if rating is undefined
          website: businessData.website,
          featuredImage: businessData.featured_image,
          mainCategory: businessData.main_category,
          categories: businessData.categories,
          workdayTiming: businessData.workday_timing,
          closedOn: businessData.closed_on,
          phone: businessData.phone,
          address: businessData.address, // Ensured to be non-null
        },
      });

      // Extract and create/update detailed reviews
      const extractedReviews = extractRelevantData(
        businessData.detailed_reviews
      );
      for (const reviewData of extractedReviews) {
        await prisma.detailedReview.upsert({
          where: { reviewId: reviewData.reviewId },
          update: {},
          create: {
            userId, // Reference to the User ID from the other database
            businessId: business.id, // Associate the review with the business
            ...reviewData, // Spread the extracted review data
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
