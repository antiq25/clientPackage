// ----------------------AUTH----------------------------------
interface ISignup {
  email: string
  password: string
  firstName: string
  lastName: string
}
interface ISignupReturn {
  id: number
  email: string
  firstName: string
  lastName: string
}
interface ILogin {
  email: string
  password: string
}
interface ILoginReturn {
  token: string
}
interface IAuth {
  signup: (data: ISignup) => Promise<ISignupReturn>
  login: (data: ILogin) => Promise<ILoginReturn>
  verifyEmail: (code: string) => Promise<void>
  resendEmailVerification: (data: { email: string }) => Promise<void>
}
// ----------------------END----------------------------------

// ----------------------PROFILE----------------------------------
interface IGetProfileReturn extends ISignupReturn {}
interface IUpdateProfileReturn extends ISignupReturn {}
interface IProfileService {
  getProfile: (id: number) => Promise<IGetProfileReturn>
  updateProfile: (id: number, data: any) => Promise<IUpdateProfileReturn>
}
// ----------------------END----------------------------------

// ----------------------RECOVERY----------------------------------
interface IResetPasswordReturn {
  id: number
  email: string
}
interface IRecoveryService {
  forgotPassword: (email: string) => Promise<void>
  resetPassword: (
    token: string,
    password: string
  ) => Promise<IResetPasswordReturn>
}
// ----------------------END----------------------------------
export {
  ISignup,
  ISignupReturn,
  ILogin,
  ILoginReturn,
  IAuth,
  IGetProfileReturn,
  IUpdateProfileReturn,
  IProfileService,
  IResetPasswordReturn,
  IRecoveryService
}
