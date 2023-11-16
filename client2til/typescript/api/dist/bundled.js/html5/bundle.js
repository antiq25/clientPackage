import axios from 'axios';

const apiCall = async (type, call, successMessage, errorMessagePrefix) => {
  try {
    const response = await call();
    showSuccessMessage(type, successMessage);
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    const errorMessage = error.response?.data?.message || errorMessagePrefix;
    showErrorMessage(type, `${errorMessagePrefix}: ${errorMessage}`);
    return {
      success: false,
      error: errorMessage
    };
  }
};
const showSuccessMessage = (type, message) => console.log(generateMessage("success", type, message));
const showErrorMessage = (type, message) => console.log(generateMessage("error", type, message));
const generateMessage = (messageType, type, message) => `[${messageType.toUpperCase()}] ${type}: ${message}`;

const apiClient = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
    "Access-Control-Allow-Headers": "Content-Type, Authorization"
    // Allow specific headers
  },
  withCredentials: true
});
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  console.error("Error in request interceptor:", error);
  return Promise.reject(error);
});

const authAPIEndpoints = {
  signUp: "/auth/signup",
  login: "/auth/login",
  updateProfile: "/profile/update",
  verifyEmail: (code) => `/auth/verify?code=${code}`,
  resendEmailVerification: "/auth/request-email-verif",
  fetchProfile: "/profile/fetch",
  forgotPassword: "/recovery/forgot-password",
  resetPassword: "/recovery/reset-password",
  createListing: "/dashboard/create-listing",
  getListing: "/dashboard/get-listing",
  fetchReviews: "/dashboard/fetch-reviews"
};
const authAPI = {
  signup: (data) => apiCall("signUp", () => apiClient.post(authAPIEndpoints.signUp, data), "Signup successful", "Signup failed"),
  login: (data) => apiCall("login", () => apiClient.post(authAPIEndpoints.login, data), "Login successful", "Login failed").then((response) => {
    if (response.success && response.data?.token?.token) {
      localStorage.setItem("token", response.data.token.token);
    }
    return response;
  }),
  updateProfile: (id, data) => apiCall("updateProfile", () => apiClient.put(authAPIEndpoints.updateProfile, data), "Profile updated", "Updating profile failed"),
  verifyEmail: (code) => apiCall("verifyEmail", () => apiClient.get(authAPIEndpoints.verifyEmail(code)), "Email verified", "Email verification failed"),
  resendEmailVerification: (data) => apiCall("resendEmailVerification", () => apiClient.post(authAPIEndpoints.resendEmailVerification, data), "Verification email resent", "Resending verification email failed"),
  getProfile: (id) => apiCall("fetchProfile", () => apiClient.get(authAPIEndpoints.fetchProfile), "Profile fetched", "Fetching profile failed"),
  forgotPassword: (email) => apiCall("forgotPassword", () => apiClient.post(authAPIEndpoints.forgotPassword, { email }), "Forgot password email sent", "Forgot password failed"),
  resetPassword: (code, password) => apiCall("resetPassword", () => apiClient.post(authAPIEndpoints.resetPassword, { code, password }), "Password reset successful", "Password reset failed"),
  createListing: (userId, name, reviews_url, description) => apiCall("createListing", () => apiClient.post(authAPIEndpoints.createListing, {
    userId,
    name,
    reviews_url,
    description
  }), "Listing created successfully", "Listing creation failed"),
  getListing: (userId, listingName) => apiCall("getListing", () => apiClient.get(authAPIEndpoints.getListing, {
    params: { userId, listingName }
  }), "Listing fetched", "Fetching listing failed"),
  fetchReviews: (listingId, max_reviews) => apiCall("fetchReviews", () => apiClient.get(authAPIEndpoints.fetchReviews, {
    params: { listingId, max_reviews }
  }), "Reviews fetched", "Fetching reviews failed")
};

const handleSignup$1 = (email, password, firstName, lastName) => {
  return authAPI.signup({ email, password, firstName, lastName });
};
const handleLogin$1 = (email, password) => {
  return authAPI.login({ email, password });
};
const handleVerifyEmail$1 = (code) => {
  return authAPI.verifyEmail(code);
};
const handleResendEmailVerification$1 = (email) => {
  return authAPI.resendEmailVerification({ email });
};
const handleGetProfile$1 = (id) => {
  return authAPI.getProfile(id);
};
const handleUpdateProfile$1 = (id, profileData) => {
  return authAPI.updateProfile(id, profileData);
};
const handleForgotPassword$1 = (email) => {
  return authAPI.forgotPassword(email);
};
const handleResetPassword$1 = (token, password) => {
  return authAPI.resetPassword(token, password);
};
const handleCreateListing$1 = (id, name, reviews_url, description) => {
  return authAPI.createListing(id, name, reviews_url, description);
};
const handleGetListing$1 = (userId, listingName) => {
  return authAPI.getListing(userId, listingName);
};
const handleFetchReviews$1 = (listingId, max_reviews) => {
  return authAPI.fetchReviews(listingId, max_reviews);
};

var apiWrap = /*#__PURE__*/Object.freeze({
    __proto__: null,
    handleSignup: handleSignup$1,
    handleLogin: handleLogin$1,
    handleVerifyEmail: handleVerifyEmail$1,
    handleResendEmailVerification: handleResendEmailVerification$1,
    handleGetProfile: handleGetProfile$1,
    handleUpdateProfile: handleUpdateProfile$1,
    handleForgotPassword: handleForgotPassword$1,
    handleResetPassword: handleResetPassword$1,
    handleCreateListing: handleCreateListing$1,
    handleGetListing: handleGetListing$1,
    handleFetchReviews: handleFetchReviews$1
});

const getInputValue = (id) => {
  return document.getElementById(id).value;
};
const handleSignup = async () => {
  const email = getInputValue("signupEmail");
  const password = getInputValue("signupPassword");
  const firstName = getInputValue("signupFirstName");
  const lastName = getInputValue("signupLastName");
  await handleSignup$1(email, password, firstName, lastName);
};
const handleLogin = async () => {
  const email = getInputValue("loginEmail");
  const password = getInputValue("loginPassword");
  await handleLogin$1(email, password);
};
const handleVerifyEmail = async () => {
  const code = getInputValue("verifyEmailCode");
  await handleVerifyEmail$1(code);
};
const handleResendEmailVerification = async () => {
  const email = getInputValue("resendVerificationEmail");
  await handleResendEmailVerification$1(email);
};
const handleGetProfile = async () => {
  const id = Number(localStorage.getItem("userId"));
  await handleGetProfile$1(id);
};
const handleUpdateProfile = async () => {
  const id = Number(localStorage.getItem("userId"));
  const firstName = getInputValue("firstName");
  const lastName = getInputValue("lastName");
  const profileData = { firstName, lastName };
  await handleUpdateProfile$1(id, profileData);
};
const handleForgotPassword = async () => {
  const email = getInputValue("forgotPasswordEmail");
  await handleForgotPassword$1(email);
};
const handleResetPassword = async () => {
  const token = getInputValue("resetPasswordToken");
  const password = getInputValue("resetPassword");
  await handleResetPassword$1(token, password);
};
const handleFetchReviews = async () => {
  const listingId = Number(getInputValue("listingId"));
  const max_reviews = Number(getInputValue("max_reviews"));
  await handleFetchReviews$1(listingId, max_reviews);
};
const handleCreateListing = async () => {
  const name = getInputValue("listingName");
  const reviews_url = getInputValue("reviews_url");
  const description = getInputValue("description");
  const userId = Number(localStorage.getItem("userId"));
  await handleCreateListing$1(userId, name, reviews_url, description);
};
const handleGetListing = async () => {
  const userId = Number(getInputValue("userId"));
  const listingName = getInputValue("listingName");
  await handleGetListing$1(userId, listingName);
};

var locateElement = /*#__PURE__*/Object.freeze({
    __proto__: null,
    getInputValue: getInputValue,
    handleSignup: handleSignup,
    handleLogin: handleLogin,
    handleVerifyEmail: handleVerifyEmail,
    handleResendEmailVerification: handleResendEmailVerification,
    handleGetProfile: handleGetProfile,
    handleUpdateProfile: handleUpdateProfile,
    handleForgotPassword: handleForgotPassword,
    handleResetPassword: handleResetPassword,
    handleFetchReviews: handleFetchReviews,
    handleCreateListing: handleCreateListing,
    handleGetListing: handleGetListing
});

document.getElementById("signupForm").addEventListener("submit", async (event) => {
  event.preventDefault();
  await handleSignup();
});
document.getElementById("loginForm").addEventListener("submit", async (event) => {
  event.preventDefault();
  await handleLogin();
});
document.getElementById("verifyEmailForm").addEventListener("submit", async (event) => {
  event.preventDefault();
  await handleVerifyEmail();
});
document.getElementById("resendVerificationEmail").addEventListener("submit", async (event) => {
  event.preventDefault();
  await handleResendEmailVerification();
});
document.getElementById("getProfileForm").addEventListener("submit", async (event) => {
  event.preventDefault();
  await handleGetProfile();
});
document.getElementById("updateProfileForm").addEventListener("submit", async (event) => {
  event.preventDefault();
  await handleUpdateProfile();
});
document.getElementById("forgotPasswordForm").addEventListener("submit", async (event) => {
  event.preventDefault();
  await handleForgotPassword();
});
document.getElementById("resetPasswordForm").addEventListener("submit", async (event) => {
  event.preventDefault();
  await handleResetPassword();
});
document.getElementById("fetch-reviews-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  await handleFetchReviews();
});
document.getElementById("create-listing-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  await handleCreateListing();
});
document.getElementById("get-listing-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  await handleGetListing();
});

var eventHandler = /*#__PURE__*/Object.freeze({
    __proto__: null
});

export { apiCall, apiClient as apiConfig, eventHandler as apiHTMLeventHandler, apiWrap as apiHandler, locateElement as apiHtmlLocates, authAPI, authAPIEndpoints, generateMessage, showErrorMessage, showSuccessMessage };
