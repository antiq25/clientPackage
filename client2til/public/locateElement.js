import { apiHandler } from './bundled.js'
export const handleSignup = async () => {
  try {
    const email = document.getElementById('signupEmail').value
    const password = document.getElementById('signupPassword').value
    const firstName = document.getElementById('signupFirstName').value
    const lastName = document.getElementById('signupLastName').value
    if (!email || !password || !firstName || !lastName) {
      throw new Error('All fields are required')
    }
    await apiHandler.handleSignup(email, password, firstName, lastName)
  } catch (error) {
    console.error(error)
  }
}
export const handleLogin = async () => {
  try {
    const email = document.getElementById('loginEmail').value
    const password = document.getElementById('loginPassword').value
    if (!email || !password) {
      throw new Error('Both email and password are required')
    }
    await apiHandler.handleLogin(email, password)
  } catch (error) {
    console.error(error)
  }
}
export const handleVerifyEmail = async () => {
  try {
    const code = document.getElementById('verifyEmailCode').value
    if (!code) {
      throw new Error('Verification code is required')
    }
    await apiHandler.handleVerifyEmail(code)
  } catch (error) {
    console.error(error)
  }
}
export const handleResendEmailVerification = async () => {
  try {
    const email = document.getElementById('resendVerificationEmail').value
    if (!email) {
      throw new Error('Email is required')
    }
    await apiHandler.handleResendEmailVerification(email)
  } catch (error) {
    console.error(error)
  }
}
export const handleGetProfile = async () => {
  try {
    const id = Number(document.getElementById('getProfileId').value)
    if (!id) {
      throw new Error('ID is required')
    }
    await apiHandler.handleGetProfile(id)
  } catch (error) {
    console.error(error)
  }
}
export const handleUpdateProfile = async () => {
  try {
    const id = Number(localStorage.getItem('token'))
    if (!id) {
      throw new Error('User is not logged in')
    }
    const firstName = document.getElementById('firstName').value
    const lastName = document.getElementById('lastName').value
    if (!firstName || !lastName) {
      throw new Error('Both first name and last name are required')
    }
    const profileData = { firstName, lastName }
    await apiHandler.handleUpdateProfile(id, profileData)
  } catch (error) {
    console.error(error)
  }
}
export const handleForgotPassword = async () => {
  try {
    const email = document.getElementById('forgotPasswordEmail').value
    if (!email) {
      throw new Error('Email is required')
    }
    await apiHandler.handleForgotPassword(email)
  } catch (error) {
    console.error(error)
  }
}
export const handleResetPassword = async () => {
  try {
    const token = document.getElementById('resetPasswordToken').value
    const password = document.getElementById('resetPassword').value
    if (!token || !password) {
      throw new Error('Both token and new password are required')
    }
    await apiHandler.handleResetPassword(token, password)
  } catch (error) {
    console.error(error)
  }
}
