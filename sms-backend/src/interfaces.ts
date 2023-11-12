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
  _signup: (data: ISignup) => Promise<ISignupReturn>
  _login: (data: ILogin) => Promise<ILoginReturn>
}
// ----------------------END----------------------------------

// ----------------------PROFILE----------------------------------
interface IGetProfileReturn extends ISignupReturn {}
interface IUpdateProfileReturn extends ISignupReturn {}
interface IProfileService {
  _getProfile: (id: number) => Promise<IGetProfileReturn>
  _updateProfile: (id: number, data: any) => Promise<IUpdateProfileReturn>
}
// ----------------------END----------------------------------

// ----------------------RECOVERY----------------------------------
interface IResetPasswordReturn {
  id: number
  email: string
}
interface IRecoveryService {
  _forgotPassword: (email: string) => Promise<void>
  _resetPassword: (
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
