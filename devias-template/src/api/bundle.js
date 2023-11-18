import axios from 'axios';

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

const showSuccessMessage = (type, message) =>
  console.log(generateMessage('success', type, message));
const showErrorMessage = (type, message) => console.log(generateMessage('error', type, message));
const generateMessage = (messageType, type, message) =>
  `[${messageType.toUpperCase()}] ${type}: ${message}`;

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    // Allow specific headers
  },
  withCredentials: true,
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
  createListing: '/dashboard/create-listing',
  getListing: '/dashboard/get-listing',
  fetchReviews: '/dashboard/fetch-reviews',
  deleteListing: 'dashboard/delete-listing'
};

const authAPI = {
  signup: (data) =>
    apiCall(
      'signUp',
      () => apiClient.post(authAPIEndpoints.signUp, data),
      'Signup successful',
      'Signup failed'
    ),
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
  updateProfile: (id, data) =>
    apiCall(
      'updateProfile',
      () => apiClient.put(authAPIEndpoints.updateProfile, data),
      'Profile updated',
      'Updating profile failed'
    ),
  verifyEmail: (code) =>
    apiCall(
      'verifyEmail',
      () => apiClient.get(authAPIEndpoints.verifyEmail(code)),
      'Email verified',
      'Email verification failed'
    ),
  resendEmailVerification: (data) =>
    apiCall(
      'resendEmailVerification',
      () => apiClient.post(authAPIEndpoints.resendEmailVerification, data),
      'Verification email resent',
      'Resending verification email failed'
    ),
  fetchProfile: () =>
    apiCall(
      'fetchProfile',
      () => apiClient.get(authAPIEndpoints.fetchProfile),
      'Profile fetched',
      'Fetching profile failed'
    ),
  forgotPassword: (email) =>
    apiCall(
      'forgotPassword',
      () => apiClient.post(authAPIEndpoints.forgotPassword, { email }),
      'Forgot password email sent',
      'Forgot password failed'
    ),
  resetPassword: (code, password) =>
    apiCall(
      'resetPassword',
      () => apiClient.post(authAPIEndpoints.resetPassword, { code, password }),
      'Password reset successful',
      'Password reset failed'
    ),
  createListing: (userId, name, reviews_url, description) =>
    apiCall(
      'createListing',
      () =>
        apiClient.post(authAPIEndpoints.createListing, {
          userId,
          name,
          reviews_url,
          description,
        }),
      'Listing created successfully',
      'Listing creation failed'
    ),
  getListing: (userId, listingName) =>
    apiCall(
      'getListing',
      () =>
        apiClient.get(authAPIEndpoints.getListing, {
          params: { userId, listingName },
        }),
      'Listing fetched',
      'Fetching listing failed'
    ),
  fetchReviews: (listingId, max_reviews) =>
    apiCall(
      'fetchReviews',
      () =>
        apiClient.get(authAPIEndpoints.fetchReviews, {
          params: { listingId, max_reviews },
        }),
      'Reviews fetched',
      'Fetching reviews failed'
    ),
  deleteListing: (listingId) =>
    apiCall(
      'deleteListing',
      () =>
        apiClient.delete(authAPIEndpoints.deleteListing, {
            params: { listingId },
          }),
      'Listing deleted successfully',
      'Deleting listing failed'
    ),

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
const handleGetProfile = () => {
  return authAPI.fetchProfile();
};
const handleUpdateProfile = (id, profileData) => {
  return authAPI.updateProfile(id, profileData);
};
const handleForgotPassword = (email) => {
  return authAPI.forgotPassword(email);
};
const handleResetPassword = (code, password) => {
  return authAPI.resetPassword(code, password);
};
const handleCreateListing = (id, name, reviews_url, description) => {
  return authAPI.createListing(id, name, reviews_url, description);
};
const handleGetListing = (userId, listingName) => {
  return authAPI.getListing(userId, listingName);
};
const handleFetchReviews = (listingId, max_reviews) => {
  return authAPI.fetchReviews(listingId, max_reviews);
};
const handleDeleteListing = (listingId) => {
  return authAPI.deleteListing(listingId);
};

const apiWrap = {
  handleSignup,
  handleLogin,
  handleVerifyEmail,
  handleResendEmailVerification,
  handleGetProfile,
  handleUpdateProfile,
  handleForgotPassword,
  handleResetPassword,
  handleCreateListing,
  handleGetListing,
  handleFetchReviews,
  handleDeleteListing,
};

export {
  apiCall,
  apiClient as apiConfig,
  apiWrap as apiHandler,
  authAPI,
  authAPIEndpoints,
  generateMessage,
  showErrorMessage,
  showSuccessMessage,
};
