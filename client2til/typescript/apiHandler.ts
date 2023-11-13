import { authAPI } from './apiCaller.js'
export const showSuccessMessage = (type: string, message: string) =>
  console.log(generateMessage('success', type, message))
export const showErrorMessage = (type: string, message: string) =>
  console.log(generateMessage('error', type, message))
export const generateMessage = (
  messageType: string,
  type: string,
  message: string
) => `[${messageType.toUpperCase()}] ${type}: ${message}`


export const handleAPIRequest = async (
  apiCall: (...args: any[]) => Promise<any>,
  args: any[],
  type: string = ''
) => {
  try {
    const data = await apiCall(...args)
    showSuccessMessage(type, 'Request successful')
    return data
  } catch (error) {
    showErrorMessage(type, (error as Error).message || 'Request failed')
    throw error
  }
}

export const signup = async (
  email: string,
  password: string,
  firstName: string,
  lastName: string
) =>
  handleAPIRequest(authAPI.signup, [{ email, password, firstName, lastName }])

export const handleLogin = async (email: string, password: string) =>
  handleAPIRequest(authAPI.login, [{ email, password }])

export const handleVerifyEmail = async (code: string) =>
  handleAPIRequest(authAPI.verifyEmail, [code])

export const handleResendEmailVerification = async (email: string) =>
  handleAPIRequest(authAPI.resendEmailVerification, [{ email }])

export const handleGetProfile = async (id: number) =>
  handleAPIRequest(authAPI.getProfile, [id])

export const handleUpdateProfile = async (id: number, profileData: any) =>
  handleAPIRequest(authAPI.updateProfile, [id, profileData])

export const handleForgotPassword = async (email: string) =>
  handleAPIRequest(authAPI.forgotPassword, [email])

export const handleResetPassword = async (token: string, password: string) =>
  handleAPIRequest(authAPI.resetPassword, [token, password])
