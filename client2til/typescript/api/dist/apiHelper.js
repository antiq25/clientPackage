// Modular API call wrapper to handle all calls, errors, and successes.
export const apiCall = async (type, call, successMessage, errorMessagePrefix) => {
    try {
        const response = await call();
        showSuccessMessage(type, successMessage);
        return {
            success: true,
            data: response.data
        };
    }
    catch (error) {
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
// Function to show success message
export const showSuccessMessage = (type, message) => console.log(generateMessage('success', type, message));
// Function to show error message
export const showErrorMessage = (type, message) => console.log(generateMessage('error', type, message));
// Function to generate message
export const generateMessage = (messageType, type, message) => `[${messageType.toUpperCase()}] ${type}: ${message}`;
