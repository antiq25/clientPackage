const BASE_URL = 'http://localhost:3001/api/v1';

interface CreateListingData {
  name: string;
  reviews_url: string;
  description?: string;
}

interface GetListingData {
  name?: string;
}

interface FetchReviewsData {
  listingId: number;
  max?: number;
}




async function createListing(data: CreateListingData): Promise<Response> {
  const response = await fetch(`${BASE_URL}/dashboard/listing/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  });

  return response;
}

async function getListing(query: GetListingData): Promise<Response> {
  const url = new URL(`${BASE_URL}/dashboard/listing`);

  Object.entries(query).forEach(([key, value]) => url.searchParams.append(key, String(value)));

  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  });

  return response;
}

async function fetchReviews(query: FetchReviewsData): Promise<Response> {
  const url = new URL(`${BASE_URL}/dashboard/reviews`);

  Object.entries(query).forEach(([key, value]) => url.searchParams.append(key, String(value)));

  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  });

  return response;
};

export {
  createListing,
  getListing,
  fetchReviews
}
