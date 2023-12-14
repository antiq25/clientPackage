import { authAPI } from './apiCaller.js';

const apiHandler = {
  handleSignup: (email: string, password: string, firstName: string, lastName: string) => {
    return authAPI.signup({ email, password, firstName, lastName });
  },

  handleLogin: (email: string, password: string) => {
    return authAPI.login({ email, password });
  },

  handleVerifyEmail: (code: string) => {
    return authAPI.verifyEmail(code);
  },

  handleResendEmailVerification: (email: string) => {
    return authAPI.resendEmailVerification({ email });
  },

  handleGetProfile: (id: number) => {
    return authAPI.getProfile(id);
  },

  handleUpdateProfile: (id: number, profileData: any) => {
    return authAPI.updateProfile(id, profileData);
  },

  handleForgotPassword: (email: string) => {
    return authAPI.forgotPassword(email);
  },

  handleResetPassword: (token: string, password: string) => {
    return authAPI.resetPassword(token, password);
  }
};

export default apiHandler;
