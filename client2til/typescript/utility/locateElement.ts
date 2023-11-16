import * as apiHandler from '../apiWrap'

export const getInputValue = (id: string): string => {
  return (document.getElementById(id) as HTMLInputElement).value
}

export const handleSignup = async (): Promise<void> => {
  const email = getInputValue('signupEmail')
  const password = getInputValue('signupPassword')
  const firstName = getInputValue('signupFirstName')
  const lastName = getInputValue('signupLastName')
  await apiHandler.handleSignup(email, password, firstName, lastName)
}

export const handleLogin = async (): Promise<void> => {
  const email = getInputValue('loginEmail')
  const password = getInputValue('loginPassword')
  await apiHandler.handleLogin(email, password)
}

export const handleVerifyEmail = async (): Promise<void> => {
  const code = getInputValue('verifyEmailCode')
  await apiHandler.handleVerifyEmail(code)
}

export const handleResendEmailVerification = async (): Promise<void> => {
  const email = getInputValue('resendVerificationEmail')
  await apiHandler.handleResendEmailVerification(email)
}

export const handleGetProfile = async (): Promise<void> => {
  const id = Number(localStorage.getItem('userId'))
  await apiHandler.handleGetProfile(id)
}

export const handleUpdateProfile = async (): Promise<void> => {
  const id = Number(localStorage.getItem('userId'))
  const firstName = getInputValue('firstName')
  const lastName = getInputValue('lastName')
  const profileData = { firstName, lastName }
  await apiHandler.handleUpdateProfile(id, profileData)
}

export const handleForgotPassword = async (): Promise<void> => {
  const email = getInputValue('forgotPasswordEmail')
  await apiHandler.handleForgotPassword(email)
}

export const handleResetPassword = async (): Promise<void> => {
  const token = getInputValue('resetPasswordToken')
  const password = getInputValue('resetPassword')
  await apiHandler.handleResetPassword(token, password)
}

export const handleFetchReviews = async (): Promise<void> => {
  const listingId = Number(getInputValue('listingId'))
  const max_reviews = Number(getInputValue('max_reviews'))
  await apiHandler.handleFetchReviews(listingId, max_reviews)
}

export const handleCreateListing = async (): Promise<void> => {
  const name = getInputValue('name')
  const reviews_url = getInputValue('reviews_url')
  const description = getInputValue('description')
  const userId = Number(localStorage.getItem('userId')) // Assuming the user ID is stored in localStorage

  await apiHandler.handleCreateListing(userId, name, reviews_url, description)
}

export const handleGetListing = async (): Promise<void> => {
  const userId = Number(getInputValue('userId'))
  const listingName = getInputValue('listingName')
  await apiHandler.handleGetListing(userId, listingName)
}
