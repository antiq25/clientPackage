import * as domHandlers from './locateElement.js'

document
  .getElementById('signupForm')!
  .addEventListener('submit', async (event: Event) => {
    event.preventDefault()
    await domHandlers.handleSignup()
  })

document
  .getElementById('loginForm')!
  .addEventListener('submit', async (event: Event) => {
    event.preventDefault()
    await domHandlers.handleLogin()
  })

document
  .getElementById('verifyEmailForm')!
  .addEventListener('submit', async (event: Event) => {
    event.preventDefault()
    await domHandlers.handleVerifyEmail()
  })

document
  .getElementById('resendVerificationEmail')!
  .addEventListener('submit', async (event: Event) => {
    event.preventDefault()
    await domHandlers.handleResendEmailVerification()
  })

document
  .getElementById('getProfileForm')!
  .addEventListener('submit', async (event: Event) => {
    event.preventDefault()
    await domHandlers.handleGetProfile()
  })

document
  .getElementById('updateProfileForm')!
  .addEventListener('submit', async (event: Event) => {
    event.preventDefault()
    await domHandlers.handleUpdateProfile()
  })

document
  .getElementById('forgotPasswordForm')!
  .addEventListener('submit', async (event: Event) => {
    event.preventDefault()
    await domHandlers.handleForgotPassword()
  })

document
  .getElementById('resetPasswordForm')!
  .addEventListener('submit', async (event: Event) => {
    event.preventDefault()
    await domHandlers.handleResetPassword()
  })
