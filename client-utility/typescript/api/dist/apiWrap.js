import { authAPI } from './apiCaller.js';
const apiHandler = {
    handleSignup: (email, password, firstName, lastName) => {
        return authAPI.signup({ email, password, firstName, lastName });
    },
    handleLogin: (email, password) => {
        return authAPI.login({ email, password });
    },
    handleVerifyEmail: (code) => {
        return authAPI.verifyEmail(code);
    },
    handleResendEmailVerification: (email) => {
        return authAPI.resendEmailVerification({ email });
    },
    handleGetProfile: (id) => {
        return authAPI.getProfile(id);
    },
    handleUpdateProfile: (id, profileData) => {
        return authAPI.updateProfile(id, profileData);
    },
    handleForgotPassword: (email) => {
        return authAPI.forgotPassword(email);
    },
    handleResetPassword: (token, password) => {
        return authAPI.resetPassword(token, password);
    }
};
export default apiHandler;
