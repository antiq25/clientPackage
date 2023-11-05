import ProfileService from '../services/profile.service'
import joi from 'joi'
import SafeError from '../safeError'
import safeReturn from '../safeReturn'

class ProfileController extends ProfileService {
  constructor() {
    super()
  }

  public getProfile = async (req: any, res: any): Promise<void> => {
    try {
      const { id } = req.user

      const profile = await this._getProfile(id)

      if (!profile) {
        throw new SafeError('Profile not found', true)
      }

      res.status(200).json({
        message: 'Profile found',
        profile
      })
    } catch (err: any) {
      return safeReturn(res, err)
    }
  }

  public updateProfile = async (req: any, res: any): Promise<void> => {
    try {
      const { id } = req.user
      const { firstName, lastName } = req.body

      const schema = joi.object({
        firstName: joi.string().alphanum().max(20),
        lastName: joi.string().alphanum().min(2)
      })

      const { error } = schema.validate({
        firstName,
        lastName
      })

      if (error) {
        throw new SafeError(error.message, true)
      }

      const profile = await this._updateProfile(id, { firstName, lastName })

      if (!profile) {
        throw new SafeError('Profile not found', true)
      }

      res.status(200).json({
        message: 'Profile updated',
        user: {
          firstName: profile.firstName,
          lastName: profile.lastName
        }
      })
    } catch (err: any) {
      return safeReturn(res, err)
    }
  }
}

export default ProfileController
