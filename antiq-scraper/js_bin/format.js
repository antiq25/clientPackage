import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getFormattedReviews = async (userId) => {
  try {
    // Ensure userId is a string to match the expected type in Prisma schema
    const userIdString = String(userId);

    // Fetch detailed reviews with business information for the specified user
    const detailedReviewsWithBusiness = await prisma.detailedReview.findMany({
      where: {
        userId: userIdString, // Use the string version of userId
      },

    });

    // Format the data for the client
    const formattedDataForClient = detailedReviewsWithBusiness.map(
      (detailedReview) => ({
        // Structure the data as needed for the client
        name: detailedReview.business.name,
        reviewCount: detailedReview.business.reviewCount,
        isSpendingOnAds: detailedReview.business.isSpendingOnAds,
        averageRating: detailedReview.business.averageRating,
        reviewerName: detailedReview.reviewerName,
        reviewText: detailedReview.reviewText,
        publishedAt: detailedReview.publishedAt.toISOString(),
        rating: detailedReview.rating,
        // ... include any other fields you need to display
      })
    );

    return formattedDataForClient;
  } catch (error) {
    console.error("Error fetching formatted reviews:", error);
    throw error;
  }
};
