import { ISignup, ILogin } from '../interfaces'
import AuthService from '../services/auth.service'
import joi from 'joi'
import SafeError from '../safeError'
import safeReturn from '../safeReturn'

class AuthController extends AuthService {
  constructor() {
    super()
  }

  public signup = async (req: any, res: any): Promise<void> => {
    try {
      const { email, password, firstName, lastName } = req.body as ISignup

      const schema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(8).required(),
        firstName: joi.string().required(),
        lastName: joi.string().required()
      })

      const { error } = schema.validate({
        email,
        password,
        firstName,
        lastName
      })

      if (error) {
        throw new SafeError(error.message, true)
      }

      const user = await this._signup({ email, password, firstName, lastName })

      if (!user) {
        throw new SafeError('Signup failed', true)
      }

      res.status(200).json({
        message: 'Signup successful',
        user
      })
    } catch (err: any) {
      return safeReturn(res, err)
    }
  }

  public login = async (req: any, res: any): Promise<void> => {
    try {
      const { email, password } = req.body as ILogin

      const schema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(8).required()
      })

      const { error } = schema.validate({ email, password })

      if (error) {
        throw new Error(error.message)
      }

      const token = await this._login({ email, password })

      if (!token) {
        throw new SafeError('Login failed', true)
      }

      res.status(200).json({
        message: 'Login successful',
        token
      })
    } catch (err: any) {
      return safeReturn(res, err)
    }
  }

  public verifyEmail = async (req: any, res: any): Promise<void> => {
    try {
      const { code } = req.query

      const schema = joi.object({
        code: joi.string().required()
      })

      const { error } = schema.validate({ code })

      if (error) {
        throw new SafeError(error.message)
      }

      const user = await this._verifyEmail(code)

      if (!user) {
        throw new SafeError('Verification failed', true)
      }

      res.status(200).json({
        message: 'Verification successful'
      })
    } catch (err: any) {
      return safeReturn(res, err)
    }
  }

  public resendEmailVerification = async (
    req: any,
    res: any
  ): Promise<void> => {
    try {
      const { email } = req.body

      const schema = joi.object({
        email: joi.string().email().required()
      })

      const { error } = schema.validate({ email })

      if (error) {
        throw new SafeError(error.message)
      }

      const code = await this._resendVerificationEmail(email)

      if (!code) {
        throw new SafeError('Resend failed', true)
      }

      res.status(200).json({
        message: 'Resend successful'
      })
    } catch (err: any) {
      return safeReturn(res, err)
    }
  }
}

export default AuthController
