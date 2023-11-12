import axios from 'axios';

/**
 * Perform an API call.
 * @param {string} type - The type of the API call.
 * @param {Function} call - The API call function.
 * @param {string} successMessage - The success message to display.
 * @param {string} errorMessagePrefix - The error message prefix to display.
 * @returns {Promise<Object>} - The API response.
 */
const apiCall = async (type, call, successMessage, errorMessagePrefix) => {
  try {
    const response = await call();
    showSuccessMessage(type, successMessage);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    const errorMessage = error.response?.data?.message || errorMessagePrefix;
    showErrorMessage(type, `${errorMessagePrefix}: ${errorMessage}`);
    return {
      success: false,
      error: errorMessage,
    };
  }
};

/**
 * Display a success message.
 * @param {string} type - The type of the message.
 * @param {string} message - The message to display.
 */
const showSuccessMessage = (type, message) =>
  console.log(generateMessage('success', type, message));

/**
 * Display an error message.
 * @param {string} type - The type of the message.
 * @param {string} message - The message to display.
 */
const showErrorMessage = (type, message) => console.log(generateMessage('error', type, message));

/**
 * Generate a formatted message.
 * @param {string} messageType - The type of the message.
 * @param {string} type - The type of the API call.
 * @param {string} message - The message to display.
 * @returns {string} - The formatted message.
 */
const generateMessage = (messageType, type, message) =>
  `[${messageType.toUpperCase()}] ${type}: ${message}`;

var apiHelper = {
  showSuccessMessage,
  showErrorMessage,
  generateMessage,
  default: apiCall,
};

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    // Allow requests from any origin
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
    // Allow specific HTTP methods
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    // Allow specific headers
    withCredentials: true
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Error in request interceptor:', error);
    return Promise.reject(error);
  }
);

const authAPIEndpoints = {
  signUp: '/auth/signup',
  login: '/auth/login',
  updateProfile: '/profile/update',
  verifyEmail: (code) => `/auth/verify?code=${code}`,
  resendEmailVerification: '/auth/request-email-verif',
  fetchProfile: '/profile/fetch',
  forgotPassword: '/recovery/forgot-password',
  resetPassword: '/recovery/reset-password',
};

const authAPI = {
  /**
   * Sign up a user.
   * @param {Object} data - The user data.
   * @returns {Promise<Object>} - The API response.
   */
  signup: (data) =>
    apiCall(
      'signUp',
      () => apiClient.post(authAPIEndpoints.signUp, data),
      'Signup successful',
      'Signup failed'
    ),

  /**
   * Log in a user.
   * @param {Object} data - The login data.
   * @returns {Promise<Object>} - The API response.
   */
  login: (data) =>
    apiCall(
      'login',
      () => apiClient.post(authAPIEndpoints.login, data),
      'Login successful',
      'Login failed'
    ).then((response) => {
      if (response.success && response.data?.token?.token) {
        localStorage.setItem('token', response.data.token.token);
      }
      return response;
    }),

  /**
   * Update a user's profile.
   * @param {number} id - The user ID.
   * @param {Object} data - The updated profile data.
   * @returns {Promise<Object>} - The API response.
   */
  updateProfile: (id, data) =>
    apiCall(
      'updateProfile',
      () => apiClient.put(`${authAPIEndpoints.updateProfile}/${id}`, data),
      'Profile updated',
      'Updating profile failed'
    ),

  /**
   * Verify a user's email.
   * @param {string} code - The verification code.
   * @returns {Promise<Object>} - The API response.
   */
  verifyEmail: (code) =>
    apiCall(
      'verifyEmail',
      () => apiClient.get(authAPIEndpoints.verifyEmail(code)),
      'Email verified',
      'Email verification failed'
    ),

  /**
   * Resend the email verification.
   * @param {Object} data - The email data.
   * @returns {Promise<Object>} - The API response.
   */
  resendEmailVerification: (data) =>
    apiCall(
      'resendEmailVerification',
      () => apiClient.post(authAPIEndpoints.resendEmailVerification, data),
      'Verification email resent',
      'Resending verification email failed'
    ),

  /**
   * Get a user's profile.
   * @param {number} id - The user ID.
   * @returns {Promise<Object>} - The API response.
   */
  getProfile: (id) =>
    apiCall(
      'fetchProfile',
      () => apiClient.get(authAPIEndpoints.fetchProfile),
      'Profile fetched',
      'Fetching profile failed'
    ),

  /**
   * Send a forgot password email.
   * @param {string} email - The user's email.
   * @returns {Promise<Object>} - The API response.
   */
  forgotPassword: (email) =>
    apiCall(
      'forgotPassword',
      () => apiClient.post(authAPIEndpoints.forgotPassword, { email }),
      'Forgot password email sent',
      'Forgot password failed'
    ),

  /**
   * Reset a user's password.
   * @param {string} code - The reset code.
   * @param {string} password - The new password.
   * @returns {Promise<Object>} - The API response.
   */
  resetPassword: (code, password) =>
    apiCall(
      'resetPassword',
      () => apiClient.post(authAPIEndpoints.resetPassword, { code, password }),
      'Password reset successful',
      'Password reset failed'
    ),

  fetchGoogleTrends: (query) =>
    apiCall(
      'googleTrendsSearch',
      () =>
        apiClient.get('http://localhost:3002/trends', {
          params: {
            engine: 'google_trends',
            q: query,
            api_key: '06c6147102f36fdb70ce1d59c0231414d082d1511f9b39d47ea5e0457e13c185',
          },
        }),
      'Trends fetched successfully',
      'Failed to fetch trends'
    ),
};

var apiCaller = {
  authAPIEndpoints: authAPIEndpoints,
  authAPI: authAPI,
};

const handleSignup = (email, password, firstName, lastName) => {
  return authAPI.signup({ email, password, firstName, lastName });
};

const handleLogin = (email, password) => {
  return authAPI.login({ email, password });
};

const handleVerifyEmail = (code) => {
  return authAPI.verifyEmail(code);
};

const handleResendEmailVerification = (email) => {
  return authAPI.resendEmailVerification({ email });
};

const handleGetProfile = (id) => {
  return authAPI.getProfile(id);
};

const handleUpdateProfile = (id, profileData) => {
  return authAPI.updateProfile(id, profileData);
};

const handleForgotPassword = (email) => {
  return authAPI.forgotPassword(email);
};

const handleResetPassword = (token, password) => {
  return authAPI.resetPassword(token, password);
};

var api_wrap = {
  handleSignup,
  handleLogin,
  handleVerifyEmail,
  handleResendEmailVerification,
  handleGetProfile,
  handleUpdateProfile,
  handleForgotPassword,
  handleResetPassword,
};

const dashboardAPIEndpoints = {
  createListing: '/dashboard/create-listing',
  getListing: '/dashboard/get-listing',
  fetchReviews: '/dashboard/fetch-reviews',
};

const dashboardAPI = {
  /**
   * Create a listing.
   * @param {number} userId - The user ID.
   * @param {string} name - The listing name.
   * @param {string} reviews_url - The reviews URL.
   * @param {string} description - The listing description.
   * @returns {Promise<Object>} - The API response.
   */
  createListing: (userId, name, reviews_url, description) =>
    apiCall(
      'createListing',
      () =>
        apiClient.post(dashboardAPIEndpoints.createListing, {
          userId,
          name,
          reviews_url,
          description,
        }),
      'Listing created successfully',
      'Listing creation failed'
    ),

  /**
   * Get a listing.
   * @param {number} userId - The user ID.
   * @param {string} listingName - The listing name.
   * @returns {Promise<Object>} - The API response.
   */
  getListing: (userId, listingName) =>
    apiCall(
      'getListing',
      () =>
        apiClient.get(dashboardAPIEndpoints.getListing, {
          params: { userId, listingName },
        }),
      'Listing fetched',
      'Fetching listing failed'
    ),

  /**
   * Fetch reviews for a listing.
   * @param {number} listingId - The listing ID.
   * @param {number} max_reviews - The maximum number of reviews to fetch.
   * @returns {Promise<Object>} - The API response.
   */
  fetchReviews: (listingId, max_reviews) =>
    apiCall(
      'fetchReviews',
      () =>
        apiClient.get(dashboardAPIEndpoints.fetchReviews, {
          params: { listingId, max_reviews },
        }),
      'Reviews fetched',
      'Fetching reviews failed'
    ),
};

export { apiCall, apiClient, api_wrap as apiHandler, authAPI, dashboardAPI };
