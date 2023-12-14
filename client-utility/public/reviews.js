export const getReviewsFromDB = async (businessName) => {
    // Correct variable name to 'token' as 'userId' is misleading
    const token = localStorage.getItem("token");
    var businessName = reviews.name;

  if (!businessName) {
    throw new Error("Business name is required");
  }

  try {
    // Sending a POST request with fetch requires a second parameter with options
    const response = await fetch(
      `http://localhost:3001/get-reviews/${encodeURIComponent(name)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Use token obtained from localStorage above
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch reviews, HTTP status: ${response.status}`
      );
    }

    const reviews = await response.json();
    return reviews || [reviews.name]; // Return an empty array if there are no reviews
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw error; // Re-throw the error to handle it later or indicate failure
  }
};
