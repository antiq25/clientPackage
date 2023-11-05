import * as apiCalls from '../api.wrap.js'

export const handleSignup = async () => {
  const email = (document.getElementById('signupEmail') as HTMLInputElement)
    .value
  const password = (
    document.getElementById('signupPassword') as HTMLInputElement
  ).value
  const firstName = (
    document.getElementById('signupFirstName') as HTMLInputElement
  ).value
  const lastName = (
    document.getElementById('signupLastName') as HTMLInputElement
  ).value
  await apiCalls.handleSignup(email, password, firstName, lastName)
}

export const handleLogin = async () => {
  const email = (document.getElementById('loginEmail') as HTMLInputElement)
    .value
  const password = (
    document.getElementById('loginPassword') as HTMLInputElement
  ).value
  await apiCalls.handleLogin(email, password)
}

export const handleVerifyEmail = async () => {
  const code = (document.getElementById('verifyEmailCode') as HTMLInputElement)
    .value
  await apiCalls.handleVerifyEmail(code)
}

export const handleResendEmailVerification = async () => {
  const email = (
    document.getElementById('resendVerificationEmail') as HTMLInputElement
  ).value
  await apiCalls.handleResendEmailVerification(email)
}

export const handleGetProfile = async () => {
  const id = Number(
    (document.getElementById('getProfileId') as HTMLInputElement).value
  )
  await apiCalls.handleGetProfile(id)
}

export const handleUpdateProfile = async () => {
  const id = Number(localStorage.getItem('token'))
  const firstName = (document.getElementById('firstName') as HTMLInputElement)
    .value
  const lastName = (document.getElementById('lastName') as HTMLInputElement)
    .value

  const profileData = { firstName, lastName }
  await apiCalls.handleUpdateProfile(id, profileData)
}

export const handleForgotPassword = async () => {
  const email = (
    document.getElementById('forgotPasswordEmail') as HTMLInputElement
  ).value
  await apiCalls.handleForgotPassword(email)
}

export const handleResetPassword = async () => {
  const token = (
    document.getElementById('resetPasswordToken') as HTMLInputElement
  ).value
  const password = (
    document.getElementById('resetPassword') as HTMLInputElement
  ).value
  await apiCalls.handleResetPassword(token, password)
}
