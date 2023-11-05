"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleResetPassword = exports.handleForgotPassword = exports.handleUpdateProfile = exports.handleGetProfile = exports.handleResendEmailVerification = exports.handleVerifyEmail = exports.handleLogin = exports.signup = exports.handleAPIRequest = exports.generateMessage = exports.showErrorMessage = exports.showSuccessMessage = void 0;
const apiCaller_1 = require("./apiCaller");
const showSuccessMessage = (type, message) => console.log((0, exports.generateMessage)('success', type, message));
exports.showSuccessMessage = showSuccessMessage;
const showErrorMessage = (type, message) => console.log((0, exports.generateMessage)('error', type, message));
exports.showErrorMessage = showErrorMessage;
const generateMessage = (messageType, type, message) => `[${messageType.toUpperCase()}] ${type}: ${message}`;
exports.generateMessage = generateMessage;
const handleAPIRequest = async (apiCall, args, type = "") => {
    try {
        const data = await apiCall(...args);
        (0, exports.showSuccessMessage)(type, "Request successful");
        return data;
    }
    catch (error) {
        (0, exports.showErrorMessage)(type, error.message || "Request failed");
        throw error;
    }
};
exports.handleAPIRequest = handleAPIRequest;
const signup = async (email, password, firstName, lastName) => (0, exports.handleAPIRequest)(apiCaller_1.authAPI.signup, [{ email, password, firstName, lastName }]);
exports.signup = signup;
const handleLogin = async (email, password) => (0, exports.handleAPIRequest)(apiCaller_1.authAPI.login, [{ email, password }]);
exports.handleLogin = handleLogin;
const handleVerifyEmail = async (code) => (0, exports.handleAPIRequest)(apiCaller_1.authAPI.verifyEmail, [code]);
exports.handleVerifyEmail = handleVerifyEmail;
const handleResendEmailVerification = async (email) => (0, exports.handleAPIRequest)(apiCaller_1.authAPI.resendEmailVerification, [{ email }]);
exports.handleResendEmailVerification = handleResendEmailVerification;
const handleGetProfile = async (id) => (0, exports.handleAPIRequest)(apiCaller_1.authAPI.getProfile, [id]);
exports.handleGetProfile = handleGetProfile;
const handleUpdateProfile = async (id, profileData) => (0, exports.handleAPIRequest)(apiCaller_1.authAPI.updateProfile, [id, profileData]);
exports.handleUpdateProfile = handleUpdateProfile;
const handleForgotPassword = async (email) => (0, exports.handleAPIRequest)(apiCaller_1.authAPI.forgotPassword, [email]);
exports.handleForgotPassword = handleForgotPassword;
const handleResetPassword = async (token, password) => (0, exports.handleAPIRequest)(apiCaller_1.authAPI.resetPassword, [token, password]);
exports.handleResetPassword = handleResetPassword;
