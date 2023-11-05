"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateMessage = exports.showErrorMessage = exports.showSuccessMessage = exports.apiCall = void 0;
// modular API call wrapper to handle all calls, errors, and successes.
const apiCall = async (type, call, successMessage, errorMessagePrefix) => {
    try {
        const response = await call();
        (0, exports.showSuccessMessage)(type, successMessage);
        return {
            success: true,
            data: response.data
        };
    }
    catch (error) {
        const errorMessage = error.response?.data?.message || errorMessagePrefix;
        (0, exports.showErrorMessage)(type, `${errorMessagePrefix}: ${errorMessage}`);
        return {
            success: false,
            error: errorMessage
        };
    }
};
exports.apiCall = apiCall;
// create the messages + allow generation for easy import in to react / bootstsrap components
const showSuccessMessage = (type, message) => console.log((0, exports.generateMessage)('success', type, message));
exports.showSuccessMessage = showSuccessMessage;
const showErrorMessage = (type, message) => console.log((0, exports.generateMessage)('error', type, message));
exports.showErrorMessage = showErrorMessage;
const generateMessage = (messageType, type, message) => `[${messageType.toUpperCase()}] ${type}: ${message}`;
exports.generateMessage = generateMessage;
