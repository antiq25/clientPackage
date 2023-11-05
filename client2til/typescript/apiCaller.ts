import { ISignup, ILogin } from './interfaces'
import { apiClient } from './apiConfig.js'
import { apiCall } from './apiHelper.js'

export const authAPIEndpoints = {
  signUp: '/auth/signup',
  login: '/auth/login',
  updateProfile: '/profile/update',
  verifyEmail: (code: string) => `/auth/verify?code=${code}`,
  resendEmailVerification: '/auth/request-email-verif',
  fetchProfile: '/profile/fetch',
  forgotPassword: '/recovery/forgot-password',
  resetPassword: '/recovery/reset-password'
}

export const authAPI = {
  signup: (data: ISignup) =>
    apiCall(
      'signUp',
      () => apiClient.post(authAPIEndpoints.signUp, data),
      'Signup successful',
      'Signup failed'
    ),

  login: (data: ILogin) =>
    apiCall(
      'login',
      () => apiClient.post(authAPIEndpoints.login, data),
      'Login successful',
      'Login failed'
    ).then(response => {
      // After a successful login, if there is a token, store it.
      if (response.success && response.data?.token?.token) {
        localStorage.setItem('token', response.data.token.token);
      }
      return response; // This maintains the same structure as the apiCall response.
    }),


  updateProfile: (id: number, data: Partial<ISignup>) =>
    apiCall(
      'updateProfile',
      () => apiClient.put(authAPIEndpoints.updateProfile, data),
      'Profile updated',
      'Updating profile failed'
    ),

  verifyEmail: (code: string) =>
    apiCall(
      'verifyEmail',
      () => apiClient.get(authAPIEndpoints.verifyEmail(code)),
      'Email verified',
      'Email verification failed'
    ),

  resendEmailVerification: (data: { email: string }) =>
    apiCall(
      'resendEmailVerification',
      () => apiClient.post(authAPIEndpoints.resendEmailVerification, data),
      'Verification email resent',
      'Resending verification email failed'
    ),

  getProfile: (id: number) =>
    apiCall(
      'fetchProfile',
      () => apiClient.get(authAPIEndpoints.fetchProfile),
      'Profile fetched',
      'Fetching profile failed'
    ),

  forgotPassword: (email: string) =>
    apiCall(
      'forgotPassword',
      () => apiClient.post(authAPIEndpoints.forgotPassword, { email }),
      'Forgot password email sent',
      'Forgot password failed'
    ),

  resetPassword: (code: string, password: string) =>
    apiCall(
      'resetPassword',
      () => apiClient.post(authAPIEndpoints.resetPassword, { code, password }),
      'Password reset successful',
      'Password reset failed'
    )
}
