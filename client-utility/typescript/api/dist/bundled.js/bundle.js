import axios from 'axios'

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

const apiClient = axios.create({
  baseURL: 'https://smart.aliveai.net/api/v1',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    // Allow requests from any origin
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
    // Allow specific HTTP methods
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    // Allow specific headers
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

const authAPIEndpoints = {
  signUp: '/auth/signup',
  login: '/auth/login',
  updateProfile: '/profile/update',
  verifyEmail: (code) => `/auth/verify?code=${code}`,
  resendEmailVerification: '/auth/request-email-verif',
  fetchProfile: '/profile/fetch',
  forgotPassword: '/recovery/forgot-password',
  resetPassword: '/recovery/reset-password'
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
    )
}

const crawlClient = axios.create({
  baseURL: 'https://database.aliveai.net/api/v1',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:8080',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  },
  withCredentials: true
})
crawlClient.interceptors.request.use(
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
const crawlCall = async (type, call, successMessage, errorMessagePrefix) => {
  const generateMessage = (messageType, message) =>
    `[${messageType.toUpperCase()}] ${type}: ${message}`
  try {
    const response = await call()
    console.log(generateMessage('success', successMessage))
    return {
      success: true,
      data: response.data
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || errorMessagePrefix
    console.error(
      generateMessage('error', `${errorMessagePrefix}: ${errorMessage}`)
    )
    return {
      success: false,
      error: errorMessage
    }
  }
}
const crawler = {
  collectReviews: (companyNames, companyLocations) =>
    crawlCall(
      'collectReviews',
      () =>
        crawlClient.post('/collect-reviews', {
          companyNames,
          companyLocations
        }),
      'Collect Reviews successful',
      'Collect Reviews failed'
    ),
  importReviews: () =>
    crawlCall(
      'importReviews',
      () => crawlClient.post('/import-reviews'),
      'Import Reviews successful',
      'Import Reviews failed'
    ),
  getReviews: () =>
    crawlCall(
      'getReviews',
      () => crawlClient.get('/reviews'),
      'Get Reviews successful',
      'Get Reviews failed'
    ),
  getFormattedReviews: () =>
    crawlCall(
      'getFormattedReviews',
      () => crawlClient.get('/get-reviews'),
      'Get Formatted Reviews successful',
      'Get Formatted Reviews failed'
    ),
  getBusinessNames: () =>
    crawlCall(
      'getBusinessNames',
      () => crawlClient.get('/business-names'),
      'Get Business Names successful',
      'Get Business Names failed'
    ),
  logView: (userId, businessId) =>
    crawlCall(
      'logView',
      () => crawlClient.post('/log-view', { userId, businessId }),
      'Log view successful',
      'Log view failed'
    ),
  logClick: (userId, businessId) =>
    crawlCall(
      'logClick',
      () => crawlClient.post('/log-click', { userId, businessId }),
      'Log click successful',
      'Log click failed'
    ),
  getViewCount: (userId, businessId) =>
    crawlCall(
      'getViewCount',
      () => crawlClient.get('/view-count', { params: { userId, businessId } }),
      'Get view count successful',
      'Get view count failed'
    ),
  getClickCount: (userId, businessId) =>
    crawlCall(
      'getClickCount',
      () => crawlClient.get('/click-count', { params: { userId, businessId } }),
      'Get click count successful',
      'Get click count failed'
    ),
  createWidget: (userId, businessId, widgetData) =>
    crawlCall(
      'createWidget',
      () =>
        crawlClient.post('/create-widget', { userId, businessId, widgetData }),
      'Create widget successful',
      'Create widget failed'
    ),
  getWidget: (userId, businessId) =>
    crawlCall(
      'getWidget',
      () => crawlClient.get('/widget', { params: { userId, businessId } }),
      'Get widget successful',
      'Get widget failed'
    ),
  getUserWidgets: () =>
    crawlCall(
      'getUserWidgets',
      () => crawlClient.get('/user-widgets'),
      'Get user widgets successful',
      'Get user widgets failed'
    )
}

const crawl = () => ({
  collect: (companyNames, companyLocations) => {
    return crawler.collectReviews(companyNames, companyLocations)
  },
  import: () => {
    return crawler.importReviews()
  },
  reviews: () => {
    return crawler.getReviews()
  },
  formattedReviews: () => {
    return crawler.getFormattedReviews()
  },
  businesses: () => {
    return crawler.getBusinessNames()
  },
  logView_: (userId, businessId) => {
    return crawler.logView(userId, businessId)
  },
  logClick_: (userId, businessId) => {
    return crawler.logClick(userId, businessId)
  },
  views: (userId, businessId) => {
    return crawler.getViewCount(userId, businessId)
  },
  clicks: (userId, businessId) => {
    return crawler.getClickCount(userId, businessId)
  },
  create: (userId, businessId, widgetData) => {
    return crawler.createWidget(userId, businessId, widgetData)
  },
  getWidget_: (userId, businessId) => {
    return crawler.getWidget(userId, businessId)
  },
  userWidgets_: () => {
    return crawler.getUserWidgets()
  }
})

const apiHandler = {
  handleSignup: (email, password, firstName, lastName) => {
    return authAPI.signup({ email, password, firstName, lastName })
  },
  handleLogin: (email, password) => {
    return authAPI.login({ email, password })
  },
  handleVerifyEmail: (code) => {
    return authAPI.verifyEmail(code)
  },
  handleResendEmailVerification: (email) => {
    return authAPI.resendEmailVerification({ email })
  },
  handleGetProfile: (id) => {
    return authAPI.getProfile(id)
  },
  handleUpdateProfile: (id, profileData) => {
    return authAPI.updateProfile(id, profileData)
  },
  handleForgotPassword: (email) => {
    return authAPI.forgotPassword(email)
  },
  handleResetPassword: (token, password) => {
    return authAPI.resetPassword(token, password)
  }
}

export {
  apiCall,
  apiClient as apiConfig,
  apiHandler,
  authAPI,
  authAPIEndpoints,
  crawl,
  crawlCall,
  crawlClient,
  crawler,
  generateMessage,
  showErrorMessage,
  showSuccessMessage
}
