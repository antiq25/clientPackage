import axios, { AxiosError } from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*', // Allow requests from any origin
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE', // Allow specific HTTP methods
    'Access-Control-Allow-Headers': 'Content-Type, Authorization', // Allow specific headers
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

export default apiClient;
