import apiCall  from '../apiHelper.js'
import  apiClient  from '../apiConfig.js'

export const dashboardAPIEndpoints: IDashboardEndpoints = {
  createListing: '/dashboard/create-listing',
  getListing: '/dashboard/get-listing',
  fetchReviews: '/dashboard/fetch-reviews'
}

export interface IDashboardAPI {
  fetchListing(listingName: string | undefined): unknown;
  createListing: (
    userId: number,
    name: string,
    reviews_url: string,
    description?: string
  ) => Promise<{
    [x: string]: any; success: boolean; data?: any; error?: string
  }>
  getListing: (
    userId: number,
    listingName?: string
  ) => Promise<{ success: boolean; data?: any; error?: string }>
  fetchReviews: (
    listingId: number,
    max_reviews: number,
  ) => Promise<{ success: boolean; data?: any; error?: string }>
}

export interface IDashboardEndpoints {
  createListing: string
  getListing: string
  fetchReviews: string
}

export const dashboardAPI: IDashboardAPI = {
  createListing: (
    userId: number,
    name: string,
    reviews_url: string,
    description?: string
  ) => apiCall(
    'createListing',
    () => apiClient.post(dashboardAPIEndpoints.createListing, {
      userId,
      name,
      reviews_url,
      description
    }),
    'Listing created successfully',
    'Listing creation failed'
  ),

  getListing: (userId: number, listingName?: string) => apiCall(
    'getListing',
    () => apiClient.get(dashboardAPIEndpoints.getListing, {
      params: { userId, listingName }
    }),
    'Listing fetched',
    'Fetching listing failed'
  ),

  fetchReviews: (
    listingId: number,
    max_reviews: number
  ) => apiCall(
    'fetchReviews',
    () => apiClient.get(dashboardAPIEndpoints.fetchReviews, {
      params: { listingId, max_reviews }
    }),
    'Reviews fetched',
    'Fetching reviews failed'
  ),
  fetchListing: function (listingName: string | undefined): unknown {
    throw new Error('Function not implemented.');
  }
}
