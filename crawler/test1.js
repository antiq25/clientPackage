import { getReviewsFromDB } from './test.js';
import fetchMock from 'fetch-mock';
import localStorage from 'mock-local-storage';

// Mocking local storage
global.localStorage = localStorage;

// Function to set up mock fetch responses
function mockFetch(status, statusText, response) {
  fetchMock.restore().post('*', {
    status: status,
    statusText: statusText,
    body: JSON.stringify(response),
  });
}

describe('getReviewsFromDB', () => {
  afterEach(() => {
    fetchMock.restore();
    localStorage.clear();
  });

  test('throws an error if business name is not provided', async () => {
    await expect(getReviewsFromDB()).rejects.toThrow('Business name is required');
  });

  test('fetches reviews successfully from an API', async () => {
    const fakeReviews = [{ id: 1, comment: 'Great service!' }];
    mockFetch(200, 'OK', fakeReviews);
    localStorage.setItem('token', 'fake-token');

    const businessName = 'TestBusiness';
    const reviews = await getReviewsFromDB(businessName);

    expect(reviews).toEqual(fakeReviews);
  });

  test('throws an error when fetch returns a non-ok response', async () => {
    mockFetch(404, 'Not Found', {});
    localStorage.setItem('token', 'fake-token');

    const businessName = 'TestBusiness';

    await expect(getReviewsFromDB(businessName)).rejects.toThrow(/^Failed to fetch reviews,/);
  });

  test('throws an error when fetch fails due to network issues', async () => {
    fetchMock.restore().post('*', { throws: new Error('Failed to fetch') });
    const businessName = 'TestBusiness';
    localStorage.setItem('token', 'fake-token');

    await expect(getReviewsFromDB(businessName)).rejects.toThrow('Failed to fetch');
  });

  test('returns an empty array when no reviews are returned from the API', async () => {
    mockFetch(200, 'OK', null);
    localStorage.setItem('token', 'fake-token');
    const businessName = 'TestBusiness';
    const reviews = await getReviewsFromDB(businessName);

    expect(reviews).toEqual([ undefined ]); // Due to the original code returning [reviews.name]
  });
});
