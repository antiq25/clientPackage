import RecoveryService from '../services/recovery.service'
import joi from 'joi'
import SafeError from '../safeError'
import safeReturn from '../safeReturn'

class RecoveryController extends RecoveryService {
  public forgotPassword = async (req: any, res: any): Promise<void> => {
    try {
      const { email } = req.body

      const schema = joi.object({
        email: joi.string().email().required()
      })

      const { error } = schema.validate({ email })

      if (error) {
        throw new SafeError(error.message, true)
      }

      await this._forgotPassword(email)

      res.status(200).json({
        message: 'Password reset email sent'
      })
    } catch (err: any) {
      return safeReturn(res, err)
    }
  }

  public resetPassword = async (req: any, res: any): Promise<void> => {
    try {
      const { code, password } = req.body

      const schema = joi.object({
        code: joi.string().required(),
        password: joi.string().min(8).required()
      })

      const { error } = schema.validate({ code, password })

      if (error) {
        throw new SafeError(error.message, true)
      }

      const user = await this._resetPassword(code, password)

      if (!user) {
        throw new SafeError('Password reset failed', true)
      }

      res.status(200).json({
        message: 'Password reset successful'
      })
    } catch (err: any) {
      return safeReturn(res, err)
    }
  }
}

export default RecoveryController
