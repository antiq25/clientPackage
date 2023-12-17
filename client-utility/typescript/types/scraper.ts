import axios, { AxiosResponse } from 'axios';

const crawlClient = axios.create({
  baseURL: "https://database.aliveai.net/api/v1",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "http://localhost:8080",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
    "Access-Control-Allow-Headers": "Content-Type, Authorization"
  },
  withCredentials: true
});

// Axios request interceptor to add the Authorization header
crawlClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  console.error('Error in request interceptor:', error);
  return Promise.reject(error);
});

const crawlCall = async (
  type: string,
  call: () => Promise<AxiosResponse>,
  successMessage: string,
  errorMessagePrefix: string
) => {
  const generateMessage = (messageType: string, message: string) =>
    `[${messageType.toUpperCase()}] ${type}: ${message}`;

  try {
    const response: AxiosResponse = await call();
    console.log(generateMessage('success', successMessage)); // Remove 'type' argument
    return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || errorMessagePrefix;
    console.error(
      generateMessage('error', `${errorMessagePrefix}: ${errorMessage}`)
    );
    return {
      success: false,
      error: errorMessage,
    };
  }
};

const crawler = {
  collectReviews: (companyNames: string[], companyLocations: string[]) =>
    crawlCall(
      'collectReviews',
      () => crawlClient.post('/collect-reviews', { companyNames, companyLocations }),
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

  logView: (userId: string, businessId: string) =>
    crawlCall(
      'logView',
      () => crawlClient.post('/log-view', { userId, businessId }),
      'Log view successful',
      'Log view failed'
    ),

  logClick: (userId: string, businessId: string) =>
    crawlCall(
      'logClick',
      () => crawlClient.post('/log-click', { userId, businessId }),
      'Log click successful',
      'Log click failed'
    ),

  getViewCount: (userId: string, businessId: string) =>
    crawlCall(
      'getViewCount',
      () => crawlClient.get('/view-count', { params: { userId, businessId } }),
      'Get view count successful',
      'Get view count failed'
    ),

  getClickCount: (userId: string, businessId: string) =>
    crawlCall(
      'getClickCount',
      () => crawlClient.get('/click-count', { params: { userId, businessId } }),
      'Get click count successful',
      'Get click count failed'
    ),

  createWidget: (userId: string, businessId: string, widgetData: any) =>
    crawlCall(
      'createWidget',
      () => crawlClient.post('/create-widget', { userId, businessId, widgetData }),
      'Create widget successful',
      'Create widget failed'
    ),

  getWidget: (userId: string, businessId: string) =>
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
    ),
};

export {
crawler,
crawlClient,
crawlCall
};  