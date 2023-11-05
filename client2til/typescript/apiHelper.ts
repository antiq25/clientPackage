import { AxiosResponse } from 'axios';

// modular API call wrapper to handle all calls, errors, and successes.
export const apiCall = async (
  type: string,
  call: any,
  successMessage: string,
  errorMessagePrefix: string
) => {
  try {
    const response: AxiosResponse = await call();
    showSuccessMessage(type, successMessage);
    return {
      success: true,
      data: response.data
    };
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || errorMessagePrefix;
    showErrorMessage(type, `${errorMessagePrefix}: ${errorMessage}`);
    return {
      success: false,
      error: errorMessage
    };
  }
};

// Response interceptor to handle global errors
// apiClient.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     console.error(error.response?.data);
//     const clientErrorMessage = error.response?.data?.forClient
//       ? error.response.data.message
//       : 'Something went wrong. Please try again later.';
//     return Promise.reject(clientErrorMessage);
//   }
// );

export const showSuccessMessage = (type: string, message: string) =>
  console.log(generateMessage('success', type, message));

export const showErrorMessage = (type: string, message: string) =>
  console.log(generateMessage('error', type, message));

export const generateMessage = (
  messageType: string,
  type: string,
  message: string
) => `[${messageType.toUpperCase()}] ${type}: ${message}`;
