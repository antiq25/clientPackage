import axios from 'https://cdn.jsdelivr.net/npm/axios@1.6.0/+esm'

const baseURL = 'https://smart.aliveai.net/api/v1'

const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  },
  withCredentials: true
})

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    console.error('Error in request interceptor:', error)
    return Promise.reject(error)
  }
)

const apiCall = async (type, call, successMessage, errorMessagePrefix) => {
  try {
    const response = await call()
    showSuccessMessage(type, successMessage)
    return {
      success: true,
      data: response.data
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || errorMessagePrefix
    showErrorMessage(type, `${errorMessagePrefix}: ${errorMessage}`)
    return {
      success: false,
      error: errorMessage
    }
  }
}

const showSuccessMessage = (type, message) =>
  console.log(generateMessage('success', type, message))

const showErrorMessage = (type, message) =>
  console.log(generateMessage('error', type, message))

const generateMessage = (messageType, type, message) =>
  `[${messageType.toUpperCase()}] ${type}: ${message}`

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
  fetchReviews: '/dashboard/fetch-reviews'
}

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
        localStorage.setItem('token', response.data.token.token)
      }
      return response
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
  createListing: (userId, name, reviews_url, description) =>
    apiCall(
      'createListing',
      () =>
        apiClient.post(authAPIEndpoints.createListing, {
          userId,
          name,
          reviews_url,
          description
        }),
      'Listing created successfully',
      'Listing creation failed'
    ),
  getListing: (userId, listingName) =>
    apiCall(
      'getListing',
      () =>
        apiClient.get(authAPIEndpoints.getListing, {
          params: { userId, listingName }
        }),
      'Listing fetched',
      'Fetching listing failed'
    ),
  fetchReviews: (listingId, max_reviews) =>
    apiCall(
      'fetchReviews',
      () =>
        apiClient.get(authAPIEndpoints.fetchReviews, {
          params: { listingId, max_reviews }
        }),
      'Reviews fetched',
      'Fetching reviews failed'
    )
}

const getInputValue = (id) => {
  return document.getElementById(id).value
}

const handleSubmit = (id, handler) => async (event) => {
  event.preventDefault()
  await handler()
}

const addFormListener = (id, handler) => {
  document
    .getElementById(id)
    .addEventListener('submit', handleSubmit(id, handler))
}

const handleSignup = async () => {
  const email = getInputValue('signupEmail')
  const password = getInputValue('signupPassword')
  const firstName = getInputValue('signupFirstName')
  const lastName = getInputValue('signupLastName')
  await authAPI.signup({ email, password, firstName, lastName })
}

const handleLogin = async () => {
  const email = getInputValue('loginEmail')
  const password = getInputValue('loginPassword')
  await authAPI.login({ email, password })
}

const handleVerifyEmail = async () => {
  const code = getInputValue('verifyEmailCode')
  await authAPI.verifyEmail(code)
}

const handleResendEmailVerification = async () => {
  const email = getInputValue('resendVerificationEmail')
  await authAPI.resendEmailVerification({ email })
}

const handleGetProfile = async () => {
  const id = Number(localStorage.getItem('userId'))
  await authAPI.getProfile(id)
}

const handleUpdateProfile = async () => {
  const id = Number(localStorage.getItem('userId'))
  const firstName = getInputValue('firstName')
  const lastName = getInputValue('lastName')
  const profileData = { firstName, lastName }
  await authAPI.updateProfile(id, profileData)
}

const handleForgotPassword = async () => {
  const email = getInputValue('forgotPasswordEmail')
  await authAPI.forgotPassword(email)
}

const handleResetPassword = async () => {
  const token = getInputValue('resetPasswordToken')
  const password = getInputValue('resetPassword')
  await authAPI.resetPassword(token, password)
}

const handleFetchReviews = async () => {
  const listingId = Number(getInputValue('listingId'))
  const max_reviews = Number(getInputValue('max_reviews'))
  await authAPI.fetchReviews(listingId, max_reviews)
}

const handleCreateListing = async () => {
  const name = getInputValue('name')
  const reviews_url = getInputValue('reviews_url')
  const description = getInputValue('description')
  const userId = Number(localStorage.getItem('userId'))
  await authAPI.createListing(userId, name, reviews_url, description)
}

const handleGetListing = async () => {
  const userId = Number(getInputValue('userId'))
  const listingName = getInputValue('listingName')
  await authAPI.getListing(userId, listingName)
}

addFormListener('signupForm', handleSignup)
addFormListener('loginForm', handleLogin)
addFormListener('verifyEmailForm', handleVerifyEmail)
addFormListener('resendVerificationEmail', handleResendEmailVerification)
addFormListener('getProfileForm', handleGetProfile)
addFormListener('updateProfileForm', handleUpdateProfile)
addFormListener('forgotPasswordForm', handleForgotPassword)
addFormListener('resetPasswordForm', handleResetPassword)
addFormListener('fetch-reviews-form', handleFetchReviews)
addFormListener('create-listing-form', handleCreateListing)
addFormListener('get-listing-form', handleGetListing)

export {
  apiCall,
  apiClient as apiConfig,
  authAPI,
  authAPIEndpoints,
  generateMessage,
  showErrorMessage,
  showSuccessMessage
}
