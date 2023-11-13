import { authAPI } from './apiCaller.js'

export const handleSignup = (
  email: string,
  password: string,
  firstName: string,
  lastName: string
) => {
  return authAPI.signup({ email, password, firstName, lastName })
}

export const handleLogin = (email: string, password: string) => {
  return authAPI.login({ email, password })
}

export const handleVerifyEmail = (code: string) => {
  return authAPI.verifyEmail(code)
}

export const handleResendEmailVerification = (email: string) => {
  return authAPI.resendEmailVerification({ email })
}

export const handleGetProfile = (id: number) => {
  return authAPI.getProfile(id)
}

export const handleUpdateProfile = (id: number, profileData: any) => {
  return authAPI.updateProfile(id, profileData)
}

export const handleForgotPassword = (email: string) => {
  return authAPI.forgotPassword(email)
}
export const handleResetPassword = (token: string, password: string) => {
  return authAPI.resetPassword(token, password)
}

export const handleCreateListing = (userId, name, reviews_url, description) => {
  return authAPI.createListing(userId, name, reviews_url, description)
}

export const handleGetListing = (userId, listingName) => {
  return authAPI.getListing(userId, listingName)
}

export const handleFetchReviews = (listingId, max_reviews) => {
  return authAPI.fetchReviews(listingId, max_reviews)
}
