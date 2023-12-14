export const getReviewsFromDB = async (businessName) => {
  // Correct variable name to 'token' as 'userId' is misleading
  const token = localStorage.getItem("token");

  if (!businessName) {
    throw new Error("Business name is required");
  }

  try {
    // Sending a POST request with fetch requires a second parameter with options
    const response = await fetch(
      `http://localhost:3001/get-reviews/${encodeURIComponent(businessName)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Use token obtained from localStorage above
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Check for non-ok response is duplicated; keep only one
    if (!response.ok) {
      throw new Error(
        `Failed to fetch reviews, HTTP status: ${response.status}`
      );
    }

    // Parsing json from the response instead of businessName which is an input parameter
    const reviews = await response.json();
    const businessName = reviews.name;
    // Assuming the response returns an object with a 'reviews' field. Also, the use of businessName function is incorrect.
    return reviews || [reviews.name]; // Return an empty array if there are no reviews
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw error; // Re-throw the error to handle it later or indicate failure
  }
};

