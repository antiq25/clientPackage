"use strict";
// import * as apiHandler from '../apiWrap'
// export const getInputValue = (id: string): string => {
//   return (document.getElementById(id) as HTMLInputElement).value
// }
// export const handleSignup = async (): Promise<void> => {
//   const email = getInputValue('signupEmail')
//   const password = getInputValue('signupPassword')
//   const firstName = getInputValue('signupFirstName')
//   const lastName = getInputValue('signupLastName')
//   await apiHandler.handleSignup(email, password, firstName, lastName)
// }
// export const handleLogin = async (): Promise<void> => {
//   const email = getInputValue('loginEmail')
//   const password = getInputValue('loginPassword')
//   await apiHandler.handleLogin(email, password)
// }
// export const handleVerifyEmail = async (): Promise<void> => {
//   const code = getInputValue('verifyEmailCode')
//   await apiHandler.handleVerifyEmail(code)
// }
// export const handleResendEmailVerification = async (): Promise<void> => {
//   const email = getInputValue('resendVerificationEmail')
//   await apiHandler.handleResendEmailVerification(email)
// }
// export const handleGetProfile = async (): Promise<void> => {
//   const id = Number(localStorage.getItem('userId'))
//   await apiHandler.handleGetProfile(id)
// }
// export const handleUpdateProfile = async (): Promise<void> => {
//   const id = Number(localStorage.getItem('userId'))
//   const firstName = getInputValue('firstName')
//   const lastName = getInputValue('lastName')
//   const profileData = { firstName, lastName }
//   await apiHandler.handleUpdateProfile(id, profileData)
// }
// export const handleForgotPassword = async (): Promise<void> => {
//   const email = getInputValue('forgotPasswordEmail')
//   await apiHandler.handleForgotPassword(email)
// }
// export const handleResetPassword = async (): Promise<void> => {
//   const token = getInputValue('resetPasswordToken')
//   const password = getInputValue('resetPassword')
//   await apiHandler.handleResetPassword(token, password)
// }
