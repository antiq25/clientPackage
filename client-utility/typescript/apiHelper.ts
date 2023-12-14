import { AxiosResponse } from 'axios'

export const showSuccessMessage = (type: string, message: string) =>
  console.log(generateMessage('success', type, message))

export const showErrorMessage = (type: string, message: string) =>
  console.log(generateMessage('error', type, message))

export const generateMessage = (
  messageType: string,
  type: string,
  message: string
) => `[${messageType.toUpperCase()}] ${type}: ${message}`

export const apiCall = async (
  type: string,
  call: any,
  successMessage: string,
  errorMessagePrefix: string
) => {
  try {
    const response: AxiosResponse = await call()
    showSuccessMessage(type, successMessage)
    return {
      success: true,
      data: response.data
    }
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || errorMessagePrefix
    showErrorMessage(type, `${errorMessage}: ${error.message}`)
    return {
      success: false,
      error: errorMessage
    }
  }
}
