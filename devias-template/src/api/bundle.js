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

const dashboardAPIEndpoints = {
  createListing: '/dashboard/create-listing',
  getListing: '/dashboard/get-listing',
  fetchReviews: '/dashboard/fetch-reviews',
};
const dashboardAPI = {
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
  fetchListing: function (listingName) {
    throw new Error('Function not implemented.');
  },
};

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
  getProfile: (id) =>
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
};

var interfaces = /*#__PURE__*/ Object.freeze({
  __proto__: null,
});

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

var api_wrap = /*#__PURE__*/ Object.freeze({
  __proto__: null,
  handleSignup: handleSignup,
  handleLogin: handleLogin,
  handleVerifyEmail: handleVerifyEmail,
  handleResendEmailVerification: handleResendEmailVerification,
  handleGetProfile: handleGetProfile,
  handleUpdateProfile: handleUpdateProfile,
  handleForgotPassword: handleForgotPassword,
  handleResetPassword: handleResetPassword,
});

export {
  apiCall,
  apiClient,
  api_wrap as apiHandler,
  authAPI,
  dashboardAPI,
  interfaces,
  handleLogin,
};
