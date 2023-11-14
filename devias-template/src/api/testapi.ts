const BASE_URL = 'http://localhost:3001/api/v1'; // Replace with your actual API URL

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

async function createListing(data: CreateListingData): Promise<any> {
  const response = await fetch(`${BASE_URL}/dashboard/listing/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  });

  return response.json();
}

async function getListing(query: GetListingData): Promise<any> {
    const url = new URL(`${BASE_URL}/dashboard/listing`);
    Object.entries(query).forEach(([key, value]) => url.searchParams.append(key, String(value)));

  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    },
  });

  return response.json();
}

async function fetchReviews(query: FetchReviewsData): Promise<any> {
    const url = new URL(`${BASE_URL}/dashboard/reviews`);
    Object.entries(query).forEach(([key, value]) => url.searchParams.append(key, String(value)));
    const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    return response.json();
};