import axios, { AxiosError } from 'axios'
// import axios from 'https://cdn.jsdelivr.net/npm/axios@1.6.0/+esm'

export const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
  headers: {
    'Content-Type': 'application/json'
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

