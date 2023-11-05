
const apiClient = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  headers: {
    "Content-Type": "application/json"
  },
  withCredentials: true
});
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("Error in request interceptor:", error);
    return Promise.reject(error);
  }
);

var Config = /*#__PURE__*/Object.freeze({
  __proto__: null,
  apiClient: apiClient
});

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

const authAPIEndpoints = {
  signUp: "/auth/signup",
  login: "/auth/login",
  updateProfile: "/profile/update",
  verifyEmail: (code) => `/auth/verify?code=${code}`,
  resendEmailVerification: "/auth/request-email-verif",
  fetchProfile: "/profile/fetch",
  forgotPassword: "/recovery/forgot-password",
  resetPassword: "/recovery/reset-password"
};
const authAPI = {
  signup: (data) => apiCall(
    "signUp",
    () => apiClient.post(authAPIEndpoints.signUp, data),
    "Signup successful",
    "Signup failed"
  ),
  login: (data) => apiCall(
    "login",
    () => apiClient.post(authAPIEndpoints.login, data),
    "Login successful",
    "Login failed"
  ).then((response) => {
    if (response.success && response.data?.token?.token) {
      localStorage.setItem("token", response.data.token.token);
    }
    return response;
  }),
  updateProfile: (id, data) => apiCall(
    "updateProfile",
    () => apiClient.put(authAPIEndpoints.updateProfile, data),
    "Profile updated",
    "Updating profile failed"
  ),
  verifyEmail: (code) => apiCall(
    "verifyEmail",
    () => apiClient.get(authAPIEndpoints.verifyEmail(code)),
    "Email verified",
    "Email verification failed"
  ),
  resendEmailVerification: (data) => apiCall(
    "resendEmailVerification",
    () => apiClient.post(authAPIEndpoints.resendEmailVerification, data),
    "Verification email resent",
    "Resending verification email failed"
  ),
  getProfile: (id) => apiCall(
    "fetchProfile",
    () => apiClient.get(authAPIEndpoints.fetchProfile),
    "Profile fetched",
    "Fetching profile failed"
  ),
  forgotPassword: (email) => apiCall(
    "forgotPassword",
    () => apiClient.post(authAPIEndpoints.forgotPassword, { email }),
    "Forgot password email sent",
    "Forgot password failed"
  ),
  resetPassword: (code, password) => apiCall(
    "resetPassword",
    () => apiClient.post(authAPIEndpoints.resetPassword, { code, password }),
    "Password reset successful",
    "Password reset failed"
  )
};

var Handler = /*#__PURE__*/Object.freeze({
  __proto__: null,
  authAPIEndpoints: authAPIEndpoints,
  authAPI: authAPI
});

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

var Wrapper = /*#__PURE__*/Object.freeze({
  __proto__: null,
  handleSignup: handleSignup$1,
  handleLogin: handleLogin$1,
  handleVerifyEmail: handleVerifyEmail$1,
  handleResendEmailVerification: handleResendEmailVerification$1,
  handleGetProfile: handleGetProfile$1,
  handleUpdateProfile: handleUpdateProfile$1,
  handleForgotPassword: handleForgotPassword$1,
  handleResetPassword: handleResetPassword$1
});

var Promise$1 = /*#__PURE__*/Object.freeze({
  __proto__: null
});

const handleSignup = async () => {
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;
  const firstName = document.getElementById("signupFirstName").value;
  const lastName = document.getElementById("signupLastName").value;
  await handleSignup$1(email, password, firstName, lastName);
};
const handleLogin = async () => {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;
  await handleLogin$1(email, password);
};
const handleVerifyEmail = async () => {
  const code = document.getElementById("verifyEmailCode").value;
  await handleVerifyEmail$1(code);
};
const handleResendEmailVerification = async () => {
  const email = document.getElementById("resendVerificationEmail").value;
  await handleResendEmailVerification$1(email);
};
const handleGetProfile = async () => {
  const id = Number(
    document.getElementById("getProfileId").value
  );
  await handleGetProfile$1(id);
};
const handleUpdateProfile = async () => {
  const id = Number(localStorage.getItem("token"));
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const profileData = { firstName, lastName };
  await handleUpdateProfile$1(id, profileData);
};
const handleForgotPassword = async () => {
  const email = document.getElementById("forgotPasswordEmail").value;
  await handleForgotPassword$1(email);
};
const handleResetPassword = async () => {
  const token = document.getElementById("resetPasswordToken").value;
  const password = document.getElementById("resetPassword").value;
  await handleResetPassword$1(token, password);
};

var ElementFinder = /*#__PURE__*/Object.freeze({
  __proto__: null,
  handleSignup: handleSignup,
  handleLogin: handleLogin,
  handleVerifyEmail: handleVerifyEmail,
  handleResendEmailVerification: handleResendEmailVerification,
  handleGetProfile: handleGetProfile,
  handleUpdateProfile: handleUpdateProfile,
  handleForgotPassword: handleForgotPassword,
  handleResetPassword: handleResetPassword
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

var EventHandler = /*#__PURE__*/Object.freeze({
  __proto__: null
});

const dashboardAPIEndpoints = {
  createListing: "/dashboard/create-listing",
  getListing: "/dashboard/get-listing",
  fetchReviews: "/dashboard/fetch-reviews"
};
const dashboardAPI = {
  createListing: (userId, name, reviews_url, description) => apiCall(
    "createListing",
    () => apiClient.post(dashboardAPIEndpoints.createListing, {
      userId,
      name,
      reviews_url,
      description
    }),
    "Listing created successfully",
    "Listing creation failed"
  ),
  getListing: (userId, listingName) => apiCall(
    "getListing",
    () => apiClient.get(dashboardAPIEndpoints.getListing, {
      params: { userId, listingName }
    }),
    "Listing fetched",
    "Fetching listing failed"
  ),
  fetchReviews: (listingId, max_reviews) => apiCall(
    "fetchReviews",
    () => apiClient.get(dashboardAPIEndpoints.fetchReviews, {
      params: { listingId, max_reviews }
    }),
    "Reviews fetched",
    "Fetching reviews failed"
  ),
  fetchListing: function(listingName) {
    throw new Error("Function not implemented.");
  }
};

var DashAPIFinder = /*#__PURE__*/Object.freeze({
  __proto__: null,
  dashboardAPIEndpoints: dashboardAPIEndpoints,
  dashboardAPI: dashboardAPI
});

document.getElementById("create-listing-form")?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const target = event.target;
  const formData = new FormData(target);
  const userId = Number(formData.get("userId"));
  const name = formData.get("name");
  const reviews_url = formData.get("reviews_url");
  const description = formData.get("description");
  try {
    const response = await dashboardAPI.createListing(
      userId,
      name,
      reviews_url,
      description
    );
    alert(response.success ? response.message : response.error);
  } catch (error) {
    console.error(error);
    alert("An error occurred.");
  }
});
document.getElementById("get-listing-form")?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const target = event.target;
  const formData = new FormData(target);
  const userId = Number(formData.get("userId"));
  const listingName = formData.get("listingName");
  try {
    const response = await dashboardAPI.getListing(userId, listingName);
    if (response.success) {
      console.log(response.data);
      alert("Listing fetched successfully");
    } else {
      alert(response.error);
    }
  } catch (error) {
    console.error(error);
    alert("An error occurred.");
  }
});
document.getElementById("fetch-reviews-form")?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const target = event.target;
  const formData = new FormData(target);
  Number(formData.get("userId"));
  const listingId = Number(formData.get("listingId"));
  const max_reviews = Number(formData.get("max_reviews"));
  formData.get("url");
  try {
    const response = await dashboardAPI.fetchReviews(
      listingId,
      max_reviews
    );
    if (response.success) {
      console.log(response.data);
      alert("Reviews fetched successfully");
    } else {
      alert(response.error);
    }
  } catch (error) {
    console.error(error);
    alert("An error occurred.");
  }
});

var DashElementHandler = /*#__PURE__*/Object.freeze({
  __proto__: null
});

var index = {
  Wrapper,
  Config,
  Handler,
  Promise: Promise$1,
  ElementFinder,
  EventHandler,
  DashElementHandler,
  DashAPIFinder
};

export { index as default };
