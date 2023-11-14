import { apiCall } from '../apiHelper.js';
import apiClient from '../apiConfig.js';
export const dashboardAPIEndpoints = {
    createListing: '/dashboard/create-listing',
    getListing: '/dashboard/get-listing',
    fetchReviews: '/dashboard/fetch-reviews'
};
export const dashboardAPI = {
    createListing: (userId, name, reviews_url, description) => apiCall('createListing', () => apiClient.post(dashboardAPIEndpoints.createListing, {
        userId,
        name,
        reviews_url,
        description
    }), 'Listing created successfully', 'Listing creation failed'),
    getListing: (userId, listingName) => apiCall('getListing', () => apiClient.get(dashboardAPIEndpoints.getListing, {
        params: { userId, listingName }
    }), 'Listing fetched', 'Fetching listing failed'),
    fetchReviews: (listingId, max_reviews) => apiCall('fetchReviews', () => apiClient.get(dashboardAPIEndpoints.fetchReviews, {
        params: { listingId, max_reviews }
    }), 'Reviews fetched', 'Fetching reviews failed'),
    fetchListing: function (listingName) {
        throw new Error('Function not implemented.');
    }
};
